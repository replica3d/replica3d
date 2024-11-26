import React from 'react';

const MaterialsTableHeader: React.FC = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 w-[250px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Kluczowe Cechy
        </th>
        <th className="px-6 py-3 w-[250px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Najlepsze Zastosowania
        </th>
        <th className="px-6 py-3 w-[150px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Odporność Termiczna (°C)
        </th>
        <th className="px-6 py-3 w-[150px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Wytrzymałość (kJ/m²)
        </th>
        <th className="px-6 py-3 w-[150px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Jakość Wykończenia
        </th>
        <th className="px-6 py-3 w-[100px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Koszt
        </th>
      </tr>
    </thead>
  );
};

export default MaterialsTableHeader;