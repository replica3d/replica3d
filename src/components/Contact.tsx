import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { CheckCircle, XCircle, Upload, Loader2 } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes
const ALLOWED_TYPES = ['.stl', '.step', '.zip'];

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const validateFile = (file: File): boolean => {
    setFileError(null);

    if (file.size > MAX_FILE_SIZE) {
      setFileError('Plik jest za duży. Maksymalny rozmiar to 50MB.');
      return false;
    }

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_TYPES.includes(fileExtension)) {
      setFileError('Niedozwolony typ pliku. Dozwolone formaty: .stl, .step, .zip');
      return false;
    }

    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (validateFile(file)) {
        setSelectedFile(file);
      } else {
        event.target.value = '';
        setSelectedFile(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      let fileUrl = '';
      
      if (selectedFile) {
        const fileExtension = selectedFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const storageRef = ref(storage, `uploads/${fileName}`);
        
        await uploadBytes(storageRef, selectedFile);
        fileUrl = await getDownloadURL(storageRef);
      }

      // Get form data
      const formData = new FormData(formRef.current!);
      const templateParams = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        file_url: fileUrl || 'No file attached',
        file_name: selectedFile ? selectedFile.name : 'No file attached'
      };

      await emailjs.send(
        'replica3d',
        'template_replica3d',
        templateParams,
        'aa1yT8UoiNQxsy6fV'
      );

      setSubmitStatus('success');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      formRef.current?.reset();
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div id="contact" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 text-sm font-semibold tracking-wider mb-2">MASZ POMYSŁ NA PROJEKT?</p>
          <h2 className="text-[#333333] text-4xl md:text-5xl font-bold mb-4" aria-label="Skontaktuj się z nami">skontaktuj się z nami</h2>
          <p className="text-[#333333] max-w-2xl mx-auto">
            Jeśli masz model do wydrukowania, potrzebujesz prototypu do swojego projektu lub po prostu chciałbyś uzyskać więcej informacji o usługach, które dostarczamy, zapraszamy Cię do kontaktu. Będzie nam miło jeśli uda nam się Ci pomóc!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Imię i nazwisko"
              required
              className="w-full rounded-md border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 font-['Poppins'] text-[#333333]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full rounded-md border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 font-['Poppins'] text-[#333333]"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Wiadomość"
              required
              className="w-full rounded-md border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 font-['Poppins'] text-[#333333]"
            ></textarea>

            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".stl,.step,.zip"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center space-x-2 w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 transition-colors"
              >
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">
                  {selectedFile ? selectedFile.name : 'Dodaj plik (.stl, .step lub .zip do 50MB)'}
                </span>
              </label>
              {fileError && (
                <p className="mt-2 text-sm text-red-600">{fileError}</p>
              )}
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-500">
                  Rozmiar pliku: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !!fileError}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-body font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 font-['Poppins'] space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Wysyłanie...</span>
                </>
              ) : (
                <span>Wyślij wiadomość</span>
              )}
            </button>
          </form>

          {submitStatus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-4 p-4 rounded-md ${
                submitStatus === 'success' ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="flex items-center">
                {submitStatus === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <p
                  className={`ml-3 text-sm font-['Poppins'] ${
                    submitStatus === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {submitStatus === 'success'
                    ? 'Wiadomość wysłana pomyślnie!'
                    : 'Nie udało się wysłać wiadomości. Spróbuj ponownie.'}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
