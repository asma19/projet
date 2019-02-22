const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({

user_id:{
    type: String,
    required: true
},
    product_name:{
        type: String,
        required: true
    },
    categories:{
        type: String,
        required: true
    },
    labels:{
        type: String,
        required: true
    },

    entry_dates_tags:{
        type : Array , "default" : [] 
    },

    ingredients_text:{
        type:[String]
    },

    _id:{
        type: String,
        required: true
    },



    nutrition_data_per : {
        type: String,
        required: true
    },
    codes_tags : {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    nutrition_score_fr: {
        type: Number,
        required: true
    },
    nutrition_grade_fr:{
        type: String,
        required: true
    },
    ingredients: {
        type:[mongoose.Schema.Types.Mixed]
      },

      nutriments: {
        
            energy_100g: Number,
            sugars_100g: Number,
            "saturated-fat_100g": Number,
            proteins_100g:Number,
            sodium_100g:Number, 
            fiber_100g:Number,
      },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    brands: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    price: {
        Monoprix:Number,
        Lidt:Number, 
        Learder_Price:Number, 
        Carrefour:Number, 
        Super_U:Number,
        Eleclerc:Number,
        Casino:Number,
        currency : {type:String,default:'euro'}
    }

})
let Product = mongoose.model('Product',productSchema,'products')
module.exports = Product