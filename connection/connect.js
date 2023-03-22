const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/recipeapi')
.then(console.log("MongoDB login Successful"))
.catch(console.error);