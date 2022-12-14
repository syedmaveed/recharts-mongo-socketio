
import { MongoClient  } from 'mongodb';
import express from 'express'
import http from 'http'
import * as socketio from 'socket.io'


const port=3000;
const app=express()
const httpServer=http.createServer(app)
const server=new socketio.Server(httpServer,{
    cors:{
        origin:'*',
    }
})

var url="mongodb://127.0.0.1:27017/mydb"
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo=db.db("mydb");
    dbo.collection("customers").find({}).toArray(function(err, result) {
                if (err) throw err;
                db.close();
              //  console.log("RES ",result) 
    
let timechange
const data=result;
// const data=[result
//    // {name:result[0].name,x:result[0].x,y:result[0].y},
//     // {name:2,x:Math.random()*10,y:Math.random()*10},
//     // {name:3,x:Math.random()*10,y:Math.random()*10},
//     // {name:4,x:Math.random()*10,y:Math.random()*10},
//     // {name:5,x:Math.random()*10,y:Math.random()*10},
// ]
//socket connection
server.on("connection",(socket)=>{
    console.log("Connected")
    if(timechange) clearInterval(timechange)

    if(data.length>5){
        data.reverse().pop()
        data.reverse()
        }
       // data.push( {name:result[result[0]].name.value() ,x:result[result[0]].x,y:result[result[0]].y})
        data.push( {name:result[0].name ,x:result[0].x,y:result[0].y})
       //console.log("Data ", data)

    setInterval(()=>socket.emit("message",data),5000)
    console.log("EMIT",socket.emit("connection"))
   // setInterval(()=>socket.emit("message",new Date()),1000)
})


})
httpServer.listen(port)
})