export interface Material {
  id: string;
  name: string;
  keyFeatures: string;
  bestApplications: string;
  heatResistance: string;
  impactStrength: string;
  finishQuality: string;
  cost: 'Niski' | 'Średni' | 'Średnio-Wysoki' | 'Wysoki';
}

export const materials: Material[] = [
  {
    id: 'pla',
    name: 'PLA',
    keyFeatures: 'Łatwy w druku, ekologiczny, dobra sztywność',
    bestApplications: 'Prototypy, modele hobbystyczne, obiekty dekoracyjne',
    heatResistance: '57',
    impactStrength: '26.6',
    finishQuality: 'Gładki, błyszczący',
    cost: 'Niski'
  },
  {
    id: 'petg',
    name: 'PETG',
    keyFeatures: 'Trwały, odporny chemicznie, umiarkowana elastyczność',
    bestApplications: 'Części funkcjonalne, obudowy, pojemniki',
    heatResistance: '69',
    impactStrength: '31.5',
    finishQuality: 'Półbłyszczący',
    cost: 'Średni'
  },
  {
    id: 'asa',
    name: 'ASA',
    keyFeatures: 'Mocny, trwały, odporny na UV, umiarkowana odporność termiczna',
    bestApplications: 'Części zewnętrzne, trwałe komponenty',
    heatResistance: '100',
    impactStrength: '41.0',
    finishQuality: 'Matowy',
    cost: 'Średni'
  },
  {
    id: 'tpu',
    name: 'TPU',
    keyFeatures: 'Wysoka elastyczność, odporność na uderzenia',
    bestApplications: 'Elementy noszone, uszczelki, amortyzatory',
    heatResistance: 'N/D',
    impactStrength: '123.2',
    finishQuality: 'Matowy, gumowy',
    cost: 'Średnio-Wysoki'
  },
  {
    id: 'carbon-fiber',
    name: 'Kompozyty Węglowe',
    keyFeatures: 'Bardzo mocny, lekki, odporny na wysokie temperatury',
    bestApplications: 'Części lotnicze, elementy konstrukcyjne',
    heatResistance: 'Do 227',
    impactStrength: 'Zależy od typu (np. 40-57)',
    finishQuality: 'Matowy, teksturowany',
    cost: 'Wysoki'
  },
  {
    id: 'pc',
    name: 'PC (Poliwęglan)',
    keyFeatures: 'Wysoka wytrzymałość, bardzo trwały, dobra przezroczystość',
    bestApplications: 'Wytrzymałe obudowy, części inżynieryjne',
    heatResistance: '117',
    impactStrength: '34.8',
    finishQuality: 'Gładki, półbłyszczący',
    cost: 'Średnio-Wysoki'
  },
  {
    id: 'pet',
    name: 'PET',
    keyFeatures: 'Mocny, sztywny, doskonała stabilność wymiarowa',
    bestApplications: 'Pojemniki na żywność, części mechaniczne',
    heatResistance: '205',
    impactStrength: '36.0',
    finishQuality: 'Gładki',
    cost: 'Średni'
  },
  {
    id: 'pa6',
    name: 'PA6 (Nylon)',
    keyFeatures: 'Trwały, elastyczny, wysoka odporność na uderzenia i temperaturę',
    bestApplications: 'Przekładnie, części samochodowe, narzędzia przemysłowe',
    heatResistance: '186',
    impactStrength: '40.3',
    finishQuality: 'Matowy',
    cost: 'Wysoki'
  }
];