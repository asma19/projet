const express = require("express")
const Product = require('./models/Product')
const db = require('./config/database')

/*function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

console.log(randomDate(new Date(2012, 0, 1), new Date()))*/

let DateGenerator = require('random-date-generator');
DateGenerator.getRandomDate(); // random date

let startDate = new Date(2017, 2, 2);
let endDate = new Date(2017, 3, 3);

console.log(DateGenerator.getRandomDateInRange(startDate, endDate))

Product.find({}, (err, products) => {products.map(prod=>{
Product.updateOne({_id:prod._id}, {$set: {    price: {
    Monoprix: Math.random().toFixed(2) ,
    Lidt:Math.random().toFixed(2) , 
    Learder_Price:Math.random().toFixed(2) , 
    Carrefour:Math.random().toFixed(2) , 
    Super_U:Math.random().toFixed(2) ,
    Eleclerc:Math.random().toFixed(2) ,
    Casino:Math.random().toFixed(2) ,
    date :  DateGenerator.getRandomDateInRange(startDate, endDate)
    

    
   
  
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