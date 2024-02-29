import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { Baseurl } from './BaseUrl'
import Loader from './Loader'
import Bitcoin from '../assets/bitcoin.webp'
import './Exchanges.css'

const Exchanges = () => {
   const [loading,setLoading] = useState(true)
   const [exchanges,setExchanges] = useState([])
    useEffect(()=>{
        const getExchangeData=async()=>{
            const {data} = await axios.get(`${Baseurl}/exchanges`)
            console.log(data)
            setExchanges(exchanges)
            setLoading(false)
        }
        getExchangeData()
    },[])

  return (
    <>
{
    loading ? <Loader/> : <>
    <Header/>
    <div>

       

 <div className="ex-card">
            <div className="image">
                <img height={'80px'} src={Bitcoin} alt="" />
            </div>
            <div className="name">
                bitcoin
            </div>
            <div className="price">
                    12000000
            </div>
            <div className="rank">
                    2
            </div>
        </div>

           
    </div>
    </>
 }
 </>
  )
}

export default Exchanges