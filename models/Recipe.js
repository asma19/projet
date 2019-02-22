const mongoose = require('mongoose')
const recipetSchema = new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId,
    auto: true},
    recipe_name:{
        type: String,
        required: true
    },
    ingredient1:{
        type: String,
        required: true
    },
    ingredient2:{
        type: String,
        required: true
    },
    ingredient3:{
        type: String,
    },
    ingredient4:{
        type: String,
    },
    description:{
        type: String,
        required: true
    }
})
let Recipe = mongoose.model('Recipe',recipetSchema)
module.exports = Recipe