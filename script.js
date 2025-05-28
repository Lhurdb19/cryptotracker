 const container = document.getElementById('crypto-container');
  // const corsProxy = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=30&page=1';

  async function fetchCrypto() {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();
    displayCoins(data);
  } catch (error) {
    container.innerHTML = `<p style="color:red;">Failed to load data. Please try again later.</p>`;
    console.error(error);
  }
}

  function displayCoins(data) {
    container.innerHTML = '';
    data.forEach(coin => {
      const card = document.createElement('div');
      card.classList.add('crypto-card');
      card.innerHTML = `
        <img src="${coin.image}" alt="${coin.name}">
        <h3>${coin.name}</h3>
        <p>Symbol: ${coin.symbol.toUpperCase()}</p>
        <p>Price: $${coin.current_price.toLocaleString()}</p>
        <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
        <p>24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
      `;
      container.appendChild(card);
    });
  }

  fetchCrypto();