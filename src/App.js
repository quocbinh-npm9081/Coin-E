import './App.css';
import Coin from './Coin';
import React, {useState,useEffect} from 'react';
//https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
function App() {
  const [Coins, setCoins] = useState([]);
  const [Search, setSearch] = useState('');
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(response=>response.json())
    .then(data=> setCoins(data))
    .catch(error => console.log(error))
    // return () => {
    //   cleanup
    // };
  }, []);
 // console.log(Coins);
  const handleChange = (e) =>{
    setSearch(e.target.value);
   // console.log(Search);
  }
  const filteredCoins = Coins.filter((coin)=>{
    return coin.name.toLowerCase().includes(Search.toLowerCase());
  })
  return (
    <div className="App">
      <div className="coin-app">
        <div className="coin-search">
          <div className="coin-text">Search a currency</div>
          <form>
            <input type="text" onChange={handleChange} placeholder="Search" className="coin-input" />
          </form>
        </div>
   
        <div className="coin-container coin-nav">
        <div className="coin-row">
          <ul>
            <li>Coin</li>
            <li className="nav-child">
              <div> Price </div>
              <div> 24h Volume </div>
              <div> 24h </div>
              <div> Mkt Cap </div>
            </li>
          </ul>
        </div>
        </div>
        {filteredCoins.map((coin)=>{
          return <Coin  image={coin.image} 
                        name={coin.name} 
                        symbol={coin.symbol} 
                        marketCap={coin.market_cap}
                        price={coin.current_price} 
                        priceChange={coin.price_change_percentage_24h}
                        volume={coin.total_volume}
                        />
        })}
      </div>
    </div>
  );
}

export default App;
