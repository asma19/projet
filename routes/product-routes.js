const express = require("express")
const router = express.Router()
const Product = require('../models/Product')
const fs = require('fs')
var util = require('util')
const moment = require('moment')
moment().format();

router.get('/', (req, res) => {

    Product.find({}, (err, products) => {
        res.json(products)

    })
    //show categorie

    router.get('/showc', (req, res) => {

        res.render('product/showc')

    })
    //serach product 
    router.get('/showp', function (req, res) {
        if (req.query.search) {
            const regex = new RegExp(escapeRegex(req.query.search), 'gi')
            Product.find({ categories: regex }, function (err, allProducts) {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ products: allProducts })
                }
            }).sort({ "nutriments.energy_value": 1 }).collation({ locale: "en_US", numericOrdering: true })
        } else {

            Product.find({}, function (err, allProducts) {
                if (err) {
                    console.log(err)
                } else {
                    res.render('product/showp', { products: allProducts })
                }
            })
        }

    })



    //show single product
    router.post('/:_id', async function (req, res) {

        console.log(req.params._id)

        await Product.findOne({ _id: req.params._id }, async function (err, product) {



            if (req.query.Monoprix) {
                console.log(req.query.Monoprix)
                await Product.updateOne({ _id: req.params._id }, { '$set': { "price.Monoprix": req.query.Monoprix, "price.date": moment(req.query.date).format('YYYY-MM-DD') } }, {
                    returnNewDocument: true
                }, function (err, results) {
                    if (err) {
                        return console.error(err);
                    }
                })
            }

            if (req.query.Lidt) {
                console.log(req.query.Lidt)
                Product.updateOne({ _id: req.params._id }, { '$set': { "price.Lidt": req.query.Lidt } }, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                })
            }
            if (req.query.Learder_Price) {
                console.log(req.query.Learder_Price)
                Product.updateOne({ _id: req.params._id }, { '$set': { "price.Learder_Price": req.query.Learder_Price } }, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                })
            }

            if (req.query.Carrefour) {
                console.log(req.query.Carrefour)
                Product.updateOne({ _id: req.params._id }, { '$set': { "price.Carrefour": req.query.Carrefour } }, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                })
            }

            if (req.query.Super_U) {
                console.log(req.query.Super_U)
                Product.updateOne({ _id: req.params._id }, { '$set': { "price.Super_U": req.query.Super_U } }, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                })
            }
            if (req.query.Casino) {
                console.log(req.query.Casino)
                Product.updateOne({ _id: req.params._id }, { '$set': { "price.Casino": req.query.Casino } }, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                })
            }

            if (req.query.Eleclerc) {
                console.log(req.query.Eleclerc)
                Product.updateOne({ _id: req.params._id }, { '$set': { "price.Eleclerc": req.query.Eleclerc } }, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                })
            }


            if (!err) {
                res.json({ product: product })
            }

        })

    })






});




function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router