import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { materials, Material } from '../../data/materials';
import MaterialsTableHeader from './MaterialsTableHeader';
import MaterialsTableRow from './MaterialsTableRow';
import MaterialSelector from './MaterialSelector';

const MaterialsTable: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(materials[0]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <h2 className="text-2xl font-semibold mb-4 mt-0 text-[#333333]">
        Materiały do druku 3D
      </h2>

      <div className="prose max-w-none mb-8 text-[#333333] text-base">
        <p className="mb-4">
          Nasza drukarnia 3D oferuje szeroką gamę <strong>wysokiej jakości materiałów</strong> do wydruków na zamówienie. Każdy z nich ma unikalne właściwości, pozwalające dostosować je do indywidualnych potrzeb - od prototypów po komponenty przemysłowe. Poniżej przedstawiamy specyfikację najczęściej wykorzystywanych przez nas tworzyw. Nasi eksperci chętnie pomogą wybrać <strong>optymalny materiał</strong>, biorąc pod uwagę Państwa wymagania i budżet.
        </p>
      </div>
      
      <MaterialSelector
        materials={materials}
        selectedMaterial={selectedMaterial}
        onSelect={setSelectedMaterial}
      />

      <div className="mt-6 overflow-x-auto">
        <table className="w-full table-fixed divide-y divide-gray-200">
          <MaterialsTableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence mode="wait">
              <MaterialsTableRow key={selectedMaterial.id} material={selectedMaterial} />
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialsTable;