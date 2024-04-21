const express = require('express');
const cors = require('cors');
const books = require('./books');
const friends = require('./friends');

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.get("/books",(req,res)=>{
    setTimeout(()=>{
        res.status(200).send({
            payload: books
        })
    },1000) // 1 second for loading visibility
})

app.get("/friends",(req,res)=>{
    setTimeout(()=>{
        res.status(200).send({
            payload: friends
        })
    },1000) // 1 second for loading visibility
})

app.listen(9000);
