
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config({path:'./.env'}) 
const port = 8080;

const cors=require('cors');
const router=require("./routes/router")
app.use(cors());
app.use(express.json());

app.use(express.json());
app.use(router)

app.listen(port,()=>{
   // console.log(`${port}`)
    console.log("Server started!");
});


mongoose
  .connect(`${process.env.DB_URL}`)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));
