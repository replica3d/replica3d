import React from 'react';
import { motion } from 'framer-motion';
import { Material } from '../../data/materials';

interface MaterialsTableRowProps {
  material: Material;
}

const MaterialsTableRow: React.FC<MaterialsTableRowProps> = ({ material }) => {
  const getCostColor = (cost: Material['cost']) => {
    switch (cost) {
      case 'Niski':
        return 'bg-green-100 text-green-800';
      case 'Średni':
        return 'bg-blue-100 text-blue-800';
      case 'Średnio-Wysoki':
        return 'bg-yellow-100 text-yellow-800';
      case 'Wysoki':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <td className="px-6 py-4 w-[250px] h-[100px] align-top text-sm text-gray-900">
        {material.keyFeatures}
      </td>
      <td className="px-6 py-4 w-[250px] h-[100px] align-top text-sm text-gray-900">
        {material.bestApplications}
      </td>
      <td className="px-6 py-4 w-[150px] h-[100px] align-top text-sm text-gray-900">
        {material.heatResistance}
      </td>
      <td className="px-6 py-4 w-[150px] h-[100px] align-top text-sm text-gray-900">
        {material.impactStrength}
      </td>
      <td className="px-6 py-4 w-[150px] h-[100px] align-top text-sm text-gray-900">
        {material.finishQuality}
      </td>
      <td className="px-6 py-4 w-[100px] h-[100px] align-top text-sm">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCostColor(material.cost)}`}>
          {material.cost}
        </span>
      </td>
    </motion.tr>
  );
};

export default MaterialsTableRow;