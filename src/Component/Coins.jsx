import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Baseurl } from './baseUrl';
import Loader from './Loader';
import axios from "axios";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency,setCurrency] = useState('usd');
  const symbol = currency==='inr' ? '₹' : '$'

  useEffect(() => {
    const getCoinsData = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`);
        console.log(data);
        setCoins(data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    getCoinsData();
  }, [currency]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="btns">
            <button onClick={()=>{setCurrency('inr')}}>INR (₹)</button>
            <button onClick={()=>{setCurrency('usd')}}>USD($)</button>
          </div>
          <div>
            {coins.map((coinitem, i) => (
             <CardComponent key={i} coinitem={coinitem} i={i} symbol = {symbol}/>
            ))}
          </div>
        </>
      )}
    </>
  );
};

const CardComponent = ({coinitem,i,symbol})=>{
  const profit = coinitem.price_change_percentage_24h > 0;
  return (
    <div key={i} className='ex-cards'>
    <div className="image">
      <img height={"80px"} src={coinitem.image} alt="" />
    </div>
    <div className="name">
      {coinitem.name}
    </div>
    <div className="price">
     {symbol} {coinitem.current_price.toFixed(0)}
    </div>
    <div className="rank">
      { profit ? '+'  + coinitem.price_change_percentage_24h.toFixed(2) : coinitem.price_change_percentage_24h.toFixed(2)}
    </div>
  </div>

  )
}

export default Coins;
