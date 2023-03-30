let express = require("express");
let router = express.Router();
let Recipe = require('../models/recipeModel')
let multer = require('multer');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
const querystring = require("querystring");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: multerStorage,
});

router.get('/recipeapi/:id', async(req, res) => {
    try {
        console.log('in get with ID')
        // console.log(req)
        let _id = req.params.id.slice(1)
        console.log(_id)
        if( mongoose.Types.ObjectId.isValid(_id) ){
            console.log(true);
        }else {
            console.log("ID is not valid")
        }

        let recipe = await Recipe.find({_id:`${_id}`})
        
        if (recipe) {
            res.status(200).json({
                status: "Success",
                recipe: recipe
            })
        } else {
            res.status(404).json({
                status: "Failed",
                message: "Invalid Data"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error
        })
    }
})

router.get('/recipeapi', async(req, res) => {
    try {
        console.log("In get data")
        let recipe = await Recipe.find();
        // console.log(recipe)
        if (recipe) {
            res.status(200).json({
                status: "Success",
                recipe: recipe
            })
        } else {
            res.status(404).json({
                status: "Failed",
                message: "Invalid Data"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Server Error"
        })
    }
})

router.post('/recipeapi', upload.array('ingredientImage', 10), async (req, res) => {
    try {
        console.log('in post data')
        // console.log(req.files)
        // console.log(req.body)
        let recipe = await Recipe.create({
            recipeName: req.body.recipeName,
            recipeType: req.body.recipeType,
            typeofMeal: req.body.typeofMeal,
            making: req.body.making,
            IngredientImages: req.files,
            ingredientName: req.body.ingredientName,
            description: req.body.description,
        })
        console.log(recipe)
        if (recipe) {
            res.status(200).json({
                status: "Success",
                recipe: recipe
            })
        } else {
            res.status(404).json({
                status: "Failed",
                message: "Invalid Data"
            })
        }


    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Server Error"
        })
    }
})
router.patch('/recipeapi/:id', async(req, res) => {
    try {
        
        console.log('in Update favourite / Rating')
        console.log(req.params.id)
        console.log(req.body)
        let _id = req.params.id.slice(1)
        console.log(_id)
        if( mongoose.Types.ObjectId.isValid(_id) ){
            console.log(true);
        }else {
            console.log("ID is not valid")
        }

        let recipe = await Recipe.updateOne({_id:`${_id}`},{$set:req.body})
        
        if (recipe) {
            res.status(200).json({
                status: "Success",
                recipe: recipe
            })
        } else {
            res.status(404).json({
                status: "Failed",
                message: "Invalid Data"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error
        })
    }
})



module.exports = router;