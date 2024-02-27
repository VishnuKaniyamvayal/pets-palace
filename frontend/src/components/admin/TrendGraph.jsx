import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from "axios"

const data = [
  {
    breed: 'German Shepherd',
    quantity: 10,
  },
  {
    breed: 'Pomeranian',
    quantity: 8,
  },
  {
    breed: 'Labrador',
    quantity: 15,
  },
  // Add more data as needed
];

const Example = () => {

  const [ data , setData ] = useState([]);

  const fetchData = async()=>{
    const res = await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/admin/breedsales");
    setData(res.data.breedSales);
  }
  
  useEffect(()=>{
    fetchData();
  })



  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="petBreed" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="quantity" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Example;
