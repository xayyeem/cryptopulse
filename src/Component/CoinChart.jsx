import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { Baseurl } from './baseUrl';
import { useParams } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const CoinChart = () => {
    const [chart,setChart]=useState([])
    const{id} = useParams()
    const [days,setDays]=useState(1)
    const CoinChartData = async()=>{
        try {
            const { data } = await axios.get(`${Baseurl}/coins/${id}/market_chart?vs_currency=inr&days=${days}`);
        setChart(data.prices)
        console.log(data.prices)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        CoinChartData()
    })

    const mydata = {
        lables:chart.map((item)=>{
            const date = new Date(item[0])
            const time = date.getHours()> 12 ? `${date.getHours()-12}:${date.getHours()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`
            console.log(date)
            return days===1 ? time: date.toLocaleString()
        }),
       
    }

  return (
    <div>
        {/* <Line data={mydata}/> */}
    </div>
  )
}

export default CoinChart