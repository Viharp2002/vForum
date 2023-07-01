require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3490;
const cors = require("cors");
require("./src/conn/conn");
app.use(cors());
app.use(express.json());
const router = require("./src/routers/route");
app.use(router);

app.listen(port,()=>{
    console.log(port);
})