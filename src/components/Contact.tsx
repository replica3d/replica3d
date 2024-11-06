import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { CheckCircle, XCircle } from 'lucide-react';

const Contact = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await emailjs.sendForm(
        'replica3d',
        'template_replica3d',
        formRef.current!,
        'aa1yT8UoiNQxsy6fV'
      );
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-body font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 font-['Poppins']"
            >
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
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