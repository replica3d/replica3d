import React from 'react';
import { motion } from 'framer-motion';
import { Material } from '../../data/materials';

interface MaterialSelectorProps {
  materials: Material[];
  selectedMaterial: Material;
  onSelect: (material: Material) => void;
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  materials,
  selectedMaterial,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
      {materials.map((material) => (
        <motion.button
          key={material.id}
          onClick={() => onSelect(material)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedMaterial.id === material.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {material.name}
        </motion.button>
      ))}
    </div>
  );
};

export default MaterialSelector;