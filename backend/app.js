const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./router/home');
const bodyParser=require("body-parser");
const User = require('./model/user');
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false
}));
mongoose.connect("mongodb://localhost:27017/youtube",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

mongoose.connection.on('connected', res => {
  console.log("mongodb connection established");
});
mongoose.connection.on('error', err => {
  console.log(err);
});

app.use(routes);


app.listen(5000,()=>{
  console.log("listening on port 5000");
})
