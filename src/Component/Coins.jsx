import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Baseurl } from './baseUrl';
import Loader from './Loader';
import axios from "axios";
import {Link} from 'react-router-dom'

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
             <CardComponent key={i} id = {coinitem.id} coinitem={coinitem} i={i} symbol = {symbol}/>
            ))}
          </div>
        </>
      )}
    </>
  );
};

const CardComponent = ({coinitem,i,symbol,id})=>{
  const profit = coinitem.price_change_percentage_24h > 0;
  return (
  <Link to={`/coins/${id}`} style={{textDecoration:'none', color:'wheat'}}>
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

    <div style={profit?{color:'#90EE90'}:{color:'tomato'}} className='rank' >
      { profit ? '+'  + coinitem.price_change_percentage_24h.toFixed(2) : coinitem.price_change_percentage_24h.toFixed(2)}
    </div>
  </div>
  </Link>

  )
}

export default Coins;
