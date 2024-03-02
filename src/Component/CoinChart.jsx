import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Baseurl } from './baseUrl';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
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

const CoinChart = ({ currency }) => {
  const [chart, setChart] = useState([]);
  const { id } = useParams();
  const [days, setDays] = useState(1);

  const CoinChartData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
      setChart(data.prices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CoinChartData();
  }, [days,currency]); 

  const mydata = {
    labels: chart.map((item) => {
      const date = new Date(item[0]);
      const time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getHours()} PM` : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleString();
    }),
    datasets: [
      {
        label: `price in past ${days} days in ${currency}`,
        data: chart.map((value) => value[1]),
        borderColor: 'gold', 
        borderWidth: 2,
      }
    ]
  };
  

  return (
    <div>
      <Line data={mydata} options={{ elements: { point: { radius: 1 } } }} style={{ marginTop: '5rem', width: '100%' }} />
    </div>
  );
};

export default CoinChart;
