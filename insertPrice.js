const express = require("express")
const Product = require('./models/Product')
const db = require('./config/database')



Product.find({}, (err, products) => {products.map(prod=>{
Product.updateOne({_id:prod._id}, {$set: {    price: {
    Monoprix: Math.random().toFixed(2) ,
    Lidt:Math.random().toFixed(2) , 
    Learder_Price:Math.random().toFixed(2) , 
    Carrefour:Math.random().toFixed(2) , 
    Super_U:Math.random().toFixed(2) ,
    Eleclerc:Math.random().toFixed(2) ,
    Casino:Math.random().toFixed(2) ,
}

            }}, function(err) 
            {   if (err) {
                console.log(err)}
                else{
                    console.log('ok')
                }             
            })

        })
    })