// const container = document.getElementById('crypto-container');
// const searchInput = document.getElementById('search');

// let coinsData = [];

// async function fetchCrypto() {
//   const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
//   coinsData = await res.json();
//   displayCoins(coinsData);
// }

// function displayCoins(data) {
//   container.innerHTML = '';
//   data.forEach(coin => {
//     const card = document.createElement('div');
//     card.classList.add('crypto-card');
//     card.innerHTML = `
//       <img src="${coin.image}" alt="${coin.name}">
//       <h3>${coin.name}</h3>
//       <p>Symbol: ${coin.symbol.toUpperCase()}</p>
//       <p>Price: $${coin.current_price.toLocaleString()}</p>
//     `;
//     container.appendChild(card);
//   });
// }

// searchInput.addEventListener('input', (e) => {
//   const search = e.target.value.toLowerCase();
//   const filtered = coinsData.filter(coin => coin.name.toLowerCase().includes(search));
//   displayCoins(filtered);
// });

// fetchCrypto();

const container = document.getElementById('crypto-container');
const searchInput = document.getElementById('search');

let coinsData = [];
let page = 1;
let perPage = 20;
let loading = false;
let searchTerm = '';

async function fetchCrypto() {
  if (loading) return;
  loading = true;

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${perPage}&page=${page}`);
  const data = await res.json();
  coinsData = [...coinsData, ...data];
  displayCoins(coinsData);
  loading = false;
}

function displayCoins(data) {
  const filtered = data.filter(coin => coin.name.toLowerCase().includes(searchTerm));
  container.innerHTML = '';
  filtered.forEach(coin => {
    const card = document.createElement('div');
    card.classList.add('crypto-card');
    card.innerHTML = `
      <img src="${coin.image}" alt="${coin.name}">
      <h3>${coin.name}</h3>
      <p>Symbol: ${coin.symbol.toUpperCase()}</p>
      <p>Price: $${coin.current_price.toLocaleString()}</p>
    `;
    container.appendChild(card);
  });
}

searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value.toLowerCase();
  displayCoins(coinsData);
});

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
    page++;
    fetchCrypto();
  }
});

fetchCrypto();
