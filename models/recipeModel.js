const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    recipeName:{type:String, require},
    recipeType: {type:String},
    typeofMeal: {type:String},
    making:{type:String},
    favourite : {type:Boolean,default:false},
    IngredientImages :{type:Array},
    ingredientName : {type:Array},
    description: {type:String},
    rating:{type:Number,default:0}
})

 let recipeModel = mongoose.model("Recipe",recipeSchema);
 module.exports = recipeModel