export const VALID_ROUTES = [
  '/',
  '/druk-3d',
  '/druk-3d-warszawa', '/druk-3d-krakow', '/druk-3d-lodz',
  '/druk-3d-wroclaw', '/druk-3d-poznan', '/druk-3d-gdansk',
  '/druk-3d-szczecin', '/druk-3d-bydgoszcz', '/druk-3d-lublin',
  '/druk-3d-bialystok', '/druk-3d-katowice', '/druk-3d-gdynia',
  '/druk-3d-czestochowa', '/druk-3d-radom', '/druk-3d-sosnowiec',
  '/druk-3d-torun', '/druk-3d-kielce', '/druk-3d-rzeszow',
  '/druk-3d-gliwice', '/druk-3d-zabrze', '/druk-3d-olsztyn',
  '/druk-3d-bielsko-biala', '/druk-3d-bytom', '/druk-3d-ruda-slaska',
  '/druk-3d-rybnik', '/druk-3d-tychy', '/druk-3d-gorzow-wielkopolski',
  '/druk-3d-dabrowa-gornicza', '/druk-3d-elblag', '/druk-3d-plock'
] as const;

export const isValidRoute = (path: string): boolean => {
  return VALID_ROUTES.includes(path as any);
};