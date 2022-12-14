//socket app
import React,{useState,useEffect} from "react";
import SocketIOClient from 'socket.io-client'
import {LineChart,XAxis,Tooltip,CartesianGrid,Line} from 'recharts'

function App() {
const [data,setData]=useState("")
useEffect(()=>{
 
  const socket=SocketIOClient("http://127.0.0.1:3000/")


  socket.on("message", (data) => {
    setData(data)
    console.log("Connected!")
    console.log("Data",data) 
})

},[])


  return (
    <div>
 {/* <h1>{data}</h1> */}
 <LineChart
  width={1000}
  height={400}
  data={data}
  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
>
  <XAxis dataKey="name" interval="preserveStartEnd" />
  <Tooltip />
  <CartesianGrid stroke="#f5f5f5" />
  <Line type="monotone" dataKey="x" interval="preserveStartEnd" stroke="#ff7300" xAxisId={0} />
  <Line type="monotone" dataKey="y" interval="preserveStartEnd" stroke="#387908" yAxisId={1} />
</LineChart>
    </div>
  );
}

export default App;
