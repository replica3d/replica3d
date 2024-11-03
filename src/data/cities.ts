interface City {
  name: string;
  nameLocative: string;
  url: string;
  preposition: string;
}

export const cities: Record<string, City> = {
  warszawa: { name: 'Warszawa', nameLocative: 'Warszawie', url: 'warszawa', preposition: 'w' },
  krakow: { name: 'Kraków', nameLocative: 'Krakowie', url: 'krakow', preposition: 'w' },
  lodz: { name: 'Łódź', nameLocative: 'Łodzi', url: 'lodz', preposition: 'w' },
  wroclaw: { name: 'Wrocław', nameLocative: 'Wrocławiu', url: 'wroclaw', preposition: 'we' },
  poznan: { name: 'Poznań', nameLocative: 'Poznaniu', url: 'poznan', preposition: 'w' },
  gdansk: { name: 'Gdańsk', nameLocative: 'Gdańsku', url: 'gdansk', preposition: 'w' },
  szczecin: { name: 'Szczecin', nameLocative: 'Szczecinie', url: 'szczecin', preposition: 'w' },
  bydgoszcz: { name: 'Bydgoszcz', nameLocative: 'Bydgoszczy', url: 'bydgoszcz', preposition: 'w' },
  lublin: { name: 'Lublin', nameLocative: 'Lublinie', url: 'lublin', preposition: 'w' },
  bialystok: { name: 'Białystok', nameLocative: 'Białymstoku', url: 'bialystok', preposition: 'w' },
  katowice: { name: 'Katowice', nameLocative: 'Katowicach', url: 'katowice', preposition: 'w' },
  gdynia: { name: 'Gdynia', nameLocative: 'Gdyni', url: 'gdynia', preposition: 'w' },
  czestochowa: { name: 'Częstochowa', nameLocative: 'Częstochowie', url: 'czestochowa', preposition: 'w' },
  radom: { name: 'Radom', nameLocative: 'Radomiu', url: 'radom', preposition: 'w' },
  sosnowiec: { name: 'Sosnowiec', nameLocative: 'Sosnowcu', url: 'sosnowiec', preposition: 'w' },
  torun: { name: 'Toruń', nameLocative: 'Toruniu', url: 'torun', preposition: 'w' },
  kielce: { name: 'Kielce', nameLocative: 'Kielcach', url: 'kielce', preposition: 'w' },
  rzeszow: { name: 'Rzeszów', nameLocative: 'Rzeszowie', url: 'rzeszow', preposition: 'w' },
  gliwice: { name: 'Gliwice', nameLocative: 'Gliwicach', url: 'gliwice', preposition: 'w' },
  zabrze: { name: 'Zabrze', nameLocative: 'Zabrzu', url: 'zabrze', preposition: 'w' },
  olsztyn: { name: 'Olsztyn', nameLocative: 'Olsztynie', url: 'olsztyn', preposition: 'w' },
  bielskobiala: { name: 'Bielsko-Biała', nameLocative: 'Bielsku-Białej', url: 'bielsko-biala', preposition: 'w' },
  bytom: { name: 'Bytom', nameLocative: 'Bytomiu', url: 'bytom', preposition: 'w' },
  rudaslaska: { name: 'Ruda Śląska', nameLocative: 'Rudzie Śląskiej', url: 'ruda-slaska', preposition: 'w' },
  rybnik: { name: 'Rybnik', nameLocative: 'Rybniku', url: 'rybnik', preposition: 'w' },
  tychy: { name: 'Tychy', nameLocative: 'Tychach', url: 'tychy', preposition: 'w' },
  gorzowwlkp: { name: 'Gorzów Wielkopolski', nameLocative: 'Gorzowie Wielkopolskim', url: 'gorzow-wielkopolski', preposition: 'w' },
  dabrowagornicza: { name: 'Dąbrowa Górnicza', nameLocative: 'Dąbrowie Górniczej', url: 'dabrowa-gornicza', preposition: 'w' },
  elblag: { name: 'Elbląg', nameLocative: 'Elblągu', url: 'elblag', preposition: 'w' },
  plock: { name: 'Płock', nameLocative: 'Płocku', url: 'plock', preposition: 'w' }
};