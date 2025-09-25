const vehicleTypeSelect = document.getElementById('vehicle-type');
const brandSelect = document.getElementById('brand');
const modelSelect = document.getElementById('model');
const yearSelect = document.getElementById('year');
const infoCard = document.getElementById('vehicle-info');

const baseURL = 'https://parallelum.com.br/fipe/api/v1';

vehicleTypeSelect.addEventListener('change', loadBrands);
brandSelect.addEventListener('change', loadModels);
modelSelect.addEventListener('change', loadYears);
yearSelect.addEventListener('change', loadVehicleInfo);

function loadBrands() {
  const type = vehicleTypeSelect.value;
  fetch(`${baseURL}/${type}/marcas`)
    .then(res => res.json())
    .then(data => {
      resetSelect(brandSelect, 'Selecione');
      resetSelect(modelSelect);
      resetSelect(yearSelect);
      hideInfo();

      data.forEach(marca => {
        const opt = document.createElement('option');
        opt.value = marca.codigo;
        opt.textContent = marca.nome;
        brandSelect.appendChild(opt);
      });
    });
}

function loadModels() {
  const type = vehicleTypeSelect.value;
  const brand = brandSelect.value;
  if (!brand) return;

  fetch(`${baseURL}/${type}/marcas/${brand}/modelos`)
    .then(res => res.json())
    .then(data => {
      resetSelect(modelSelect, 'Selecione');
      resetSelect(yearSelect);
      hideInfo();

      data.modelos.forEach(modelo => {
        const opt = document.createElement('option');
        opt.value = modelo.codigo;
        opt.textContent = modelo.nome;
        modelSelect.appendChild(opt);
      });
    });
}

function loadYears() {
  const type = vehicleTypeSelect.value;
  const brand = brandSelect.value;
  const model = modelSelect.value;
  if (!model) return;

  fetch(`${baseURL}/${type}/marcas/${brand}/modelos/${model}/anos`)
    .then(res => res.json())
    .then(data => {
      resetSelect(yearSelect, 'Selecione');
      hideInfo();

      data.forEach(ano => {
        const opt = document.createElement('option');
        opt.value = ano.codigo;
        opt.textContent = ano.nome;
        yearSelect.appendChild(opt);
      });
    });
}

function loadVehicleInfo() {
  const type = vehicleTypeSelect.value;
  const brand = brandSelect.value;
  const model = modelSelect.value;
  const year = yearSelect.value;
  if (!year) return;

  fetch(`${baseURL}/${type}/marcas/${brand}/modelos/${model}/anos/${year}`)
    .then(res => res.json())
    .then(data => {
      infoCard.classList.remove('hidden');
      infoCard.innerHTML = `
        <h3>🔍 Resultado da Consulta</h3>
        <p><strong>Fabricante:</strong> ${data.Marca}</p>
        <p><strong>Modelo:</strong> ${data.Modelo}</p>
        <p><strong>Ano:</strong> ${data.AnoModelo}</p>
        <p><strong>Combustível:</strong> ${data.Combustivel}</p>
        <p><strong>Valor de Mercado:</strong> <strong>${data.Valor}</strong></p>
      `;
    });
}

function resetSelect(selectElement, defaultText = '') {
  selectElement.innerHTML = '';
  if (defaultText) {
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = defaultText;
    selectElement.appendChild(defaultOption);
  }
}

function hideInfo() {
  infoCard.classList.add('hidden');
}

loadBrands();
