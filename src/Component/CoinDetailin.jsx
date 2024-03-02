    import React from 'react'
    import { useState, useEffect } from 'react'
    import { Baseurl } from './baseUrl';
    import { useParams } from 'react-router-dom';
    import axios from 'axios';
    import Loader from './Loader';
    import './CoinDetailin.css'
    import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi'
    import { IoPulseOutline } from 'react-icons/io5'
    import CoinChart from './CoinChart';

    const CoinDetailin = () => {

        const [loading, setLoading] = useState(true)
        const [coin, setCoin] = useState([])
        const { id } = useParams()
        const [currency, setCurrency] = useState('inr')
        const currencySymbol = currency === 'inr' ? '₹' : '$'
        useEffect(() => {
            const getCoin = async () => {
                try {
                    const { data } = await axios.get(`${Baseurl}/coins/${id} `)
                    console.log(data)
                    setLoading(false)
                    setCoin(data)
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }
            }
            getCoin()
        }, [])

        const profit = coin.market_data && coin.market_data.price_change_percentage_24h > 0;

        return (
            <>
                {
                    loading ? <Loader /> : <div >
                        <div className="coin-details" style={{display:'flex', justifyContent:'space-evenly'}} >
                            <div className="coin-info">
                                <div className="btn">
                                    <button onClick={() => { setCurrency('inr') }}>INR (₹)</button>
                                    <button onClick={() => { setCurrency('usd') }}>USD($)</button>
                                </div>
                                <div className="time">
                                    {coin.last_updated}
                                </div>
                                <div className="coin-image">
                                    <img height={'150px'} src={coin.image.large} alt="" />
                                </div>
                                <div className="coin-name">
                                    {coin.name}
                                </div>
                                <div className="coin-price">
                                    {currencySymbol}
                                    {coin.market_data.current_price[currency]}
                                </div>
                                <div className="coin-profit">
                                    <IoPulseOutline color='gold' /> {profit ? <BiSolidUpArrow color='green' /> : <BiSolidDownArrow color='tomato' />} {coin.market_data.price_change_percentage_24h}%
                                </div>
                                <div className="market-rank">
                                    #{coin.market_cap_rank}
                                </div>
                                <div className="coin-para">
                                    {coin.description.en.slice(0, 200)}
                                </div>
                            </div>
                        <div style={{height:'800px', width:'800px'}} className="">
                            <CoinChart currency={currency} />
                        </div>
                        </div>
                        <div className="btns pos">
            <button onClick={()=>{setCurrency(1)}}>24 hours</button>
            <button onClick={()=>{setCurrency(30)}}>1 month</button>
            <button onClick={()=>{setCurrency(365)}}>1 year</button>

          </div>
                    </div>


                }
            </>
        )
    }

    export default CoinDetailin



