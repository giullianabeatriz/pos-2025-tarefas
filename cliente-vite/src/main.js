import { getBrands, getModels, getYears, getVehicleInfo } from './api/fipeApi.js';

const app = document.getElementById('app');

app.innerHTML = `
  <div class="app">
    <header>
      <h1>Consultar Tabela FIPE</h1>
      <p>Encontre o valor de mercado do veículo</p>
    </header>

    <main>
      <section class="form-section">
        <div class="form-group">
          <label for="vehicle-type">Tipo de Veículo</label>
          <select id="vehicle-type">
            <option value="carros">Carros</option>
            <option value="motos">Motos</option>
            <option value="caminhoes">Caminhões</option>
          </select>
        </div>

        <div class="form-group">
          <label for="brand">Fabricante (Marca)</label>
          <select id="brand">
            <option value="">Selecione</option>
          </select>
        </div>

        <div class="form-group">
          <label for="model">Modelo</label>
          <select id="model">
            <option value="">Selecione</option>
          </select>
        </div>

        <div class="form-group">
          <label for="year">Ano</label>
          <select id="year">
            <option value="">Selecione</option>
          </select>
        </div>
      </section>

      <section id="vehicle-info" class="info-card hidden"></section>
    </main>

    <footer>
      <p>Tabela FIPE</p>
    </footer>
  </div>
`;

const vehicleTypeSelect = document.getElementById('vehicle-type');
const brandSelect = document.getElementById('brand');
const modelSelect = document.getElementById('model');
const yearSelect = document.getElementById('year');
const infoCard = document.getElementById('vehicle-info');

vehicleTypeSelect.addEventListener('change', loadBrands);
brandSelect.addEventListener('change', loadModels);
modelSelect.addEventListener('change', loadYears);
yearSelect.addEventListener('change', loadVehicleInfo);

async function loadBrands() {
  const type = vehicleTypeSelect.value;
  const brands = await getBrands(type);
  resetSelect(brandSelect, 'Selecione');
  resetSelect(modelSelect);
  resetSelect(yearSelect);
  hideInfo();

  brands.forEach(marca => {
    const opt = document.createElement('option');
    opt.value = marca.codigo;
    opt.textContent = marca.nome;
    brandSelect.appendChild(opt);
  });
}

async function loadModels() {
  const type = vehicleTypeSelect.value;
  const brand = brandSelect.value;
  if (!brand) return;

  const data = await getModels(type, brand);
  resetSelect(modelSelect, 'Selecione');
  resetSelect(yearSelect);
  hideInfo();

  data.modelos.forEach(modelo => {
    const opt = document.createElement('option');
    opt.value = modelo.codigo;
    opt.textContent = modelo.nome;
    modelSelect.appendChild(opt);
  });
}

async function loadYears() {
  const type = vehicleTypeSelect.value;
  const brand = brandSelect.value;
  const model = modelSelect.value;
  if (!model) return;

  const years = await getYears(type, brand, model);
  resetSelect(yearSelect, 'Selecione');
  hideInfo();

  years.forEach(ano => {
    const opt = document.createElement('option');
    opt.value = ano.codigo;
    opt.textContent = ano.nome;
    yearSelect.appendChild(opt);
  });
}

async function loadVehicleInfo() {
  const type = vehicleTypeSelect.value;
  const brand = brandSelect.value;
  const model = modelSelect.value;
  const year = yearSelect.value;
  if (!year) return;

  const data = await getVehicleInfo(type, brand, model, year);
  infoCard.classList.remove('hidden');
  infoCard.innerHTML = `
    <h3>🔍 Resultado da Consulta</h3>
    <p><strong>Fabricante:</strong> ${data.Marca}</p>
    <p><strong>Modelo:</strong> ${data.Modelo}</p>
    <p><strong>Ano:</strong> ${data.AnoModelo}</p>
    <p><strong>Combustível:</strong> ${data.Combustivel}</p>
    <p><strong>Valor de Mercado:</strong> <strong>${data.Valor}</strong></p>
  `;
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
