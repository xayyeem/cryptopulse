import React from 'react'
import { useState, useEffect } from 'react'
import Loader from './Loader'
import { Baseurl } from './baseUrl';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CoinDetails = () => {
  const {id} = useParams()
  useEffect(()=>{
    const getCoin = async ()=>{
      try {
        const {data} = await axios.get(`${ Baseurl }/coins/${id} `)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getCoin()
  },[])
  return (
    <div>



    </div>
  )
}

export default CoinDetails