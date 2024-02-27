import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import axios from "axios"

const SalesGraph = () => {

  const [ data , setData ] = useState([]);

  const getData = async()=>{
    const res= await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/admin/sales");
    setData(res.data.data)
  }

  useEffect(()=>{
    getData();
  },[])

    return (
        <>
          <LineChart
            width={600}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="TotalSales" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </>
      );
}

export default SalesGraph