const BASE_URL = 'https://parallelum.com.br/fipe/api/v1';

export async function getBrands(type) {
  const res = await fetch(`${BASE_URL}/${type}/marcas`);
  return res.json();
}

export async function getModels(type, brandId) {
  const res = await fetch(`${BASE_URL}/${type}/marcas/${brandId}/modelos`);
  return res.json();
}

export async function getYears(type, brandId, modelId) {
  const res = await fetch(`${BASE_URL}/${type}/marcas/${brandId}/modelos/${modelId}/anos`);
  return res.json();
}

export async function getVehicleInfo(type, brandId, modelId, yearId) {
  const res = await fetch(`${BASE_URL}/${type}/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`);
  return res.json();
}
