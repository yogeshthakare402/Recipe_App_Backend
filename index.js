const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// const connect = require("./connection/connect");
const RecipeRouter = require('./routes/recipeRoute');

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect(
    "mongodb+srv://yogeshthakare402:Yogesh402@recoipeapp.1itn9wq.mongodb.net/RecipeApp?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true },
() => {
  console.log("successfully connected to db");
},
(err) => {
  console.log(err);
}
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/public', express.static('public'));

// use fileupload
// app.use(fileUpload({
//     useTempFiles:true
// }))

app.use('/api',RecipeRouter);

app.listen(8080, ()=>{
    console.log("server is running on 8080 port" )
})