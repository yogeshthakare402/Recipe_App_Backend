const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connect = require("./connection/connect");
const RecipeRouter = require('./routes/recipeRoute');

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

app.use('/api/recipeapi',RecipeRouter);

app.listen(8080, ()=>{
    console.log("server is running on 8080 port" )
})