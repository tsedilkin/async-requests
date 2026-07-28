const loader = document.getElementById('loader');
const items = document.getElementById('items');

const renderCurrency = (valute) => {
  items.innerHTML = '';

  Object.values(valute).forEach((currency) => {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
      <div class="item__code">
        ${currency.CharCode}
      </div>
      <div class="item__value">
        ${currency.Value}
      </div>
      <div class="item__currency">
        руб.
      </div>
    `;
    items.appendChild(item);
  });
};

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.send();

xhr.addEventListener('load', () => {
  if (xhr.status !== 200) {
    return;
  }

  const data = JSON.parse(xhr.responseText);
  renderCurrency(data.response.Valute);
  loader.classList.remove('loader_active');
});
