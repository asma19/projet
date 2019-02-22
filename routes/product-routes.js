
const express = require("express")
const router = express.Router()
const Product = require('../models/Product')
const Recipe = require('../models/Recipe')
const fs = require('fs')
var util = require('util')

router.get('/', (req, res) => {

    Product.find({}, (err, products) => {
        res.json(products)
       /* res.render('product/index', {
            chunk: chunk
        })*/
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

    //route to recette page
    router.get('/recette', function (req, res) {
        res.render('product/recette')
    })

    //insert recipe
    router.get('/affRecette', function (req, res) {
        if (!req.body) return res.sendStatus(400);
        console.log(JSON.stringify(req.body));
        console.log(req.body.ingredient1);
        const ing1 = req.body.ingredient1;
        const ing2 = req.body.ingredient2;
        const ing3 = req.body.ingredient3;
        const ing4 = req.body.ingredient4;
        const name = req.body.name;
        const des = req.body.description;
        console.log(req.body.ingredient2)
        var verif = 0
        Product.find({ categories: ing1 }, function (err, allProd1) {
            if (err) {
                error: req.flash('error')

            } else
                if (allProd1.length == 0) {
                    verif=verif+1
                    console.log(verif)
                };
        });
        Product.find({ categories: ing2 }, function (err, allProd2) {
            if (err) {
                error: req.flash('error')

            } else
                if (allProd2.length == 0) {
                    verif++
                };
        });
        if (ing3.length != 0) {
            Product.find({ categories: ing3 }, function (err, allProd3) {
                if (err) {
                    error: req.flash('error')

                } else
                    if (allProd3.length == 0) {
                        verif++
                    };
            });
        }
        if (ing4.length != 0) {
            Product.find({ categories: ing4 }, function (err, allProd4) {
                if (err) {
                    error: req.flash('error')

                } else
                    if (allProd4.length == 0) {
                        verif++
                    };
            });
        }

        if (verif == 0) {
            Recipe.create({ recipe_name: name, ingredient1: ing1, ingredient2: ing2, ingredient3: ing3, ingredient4: ing4, description: des }, function (err, results) {

                if (err) {
                    console.log(err)

                }
                else {
                    res.send(results);

                }
            })
        }
    });

    //show single product
    router.get('/:_id', (req, res) => {

        console.log(req.params._id)

        Product.findOne({ _id: req.params._id }, (err, product) => {

            if (!err) {
                res.json({ product: product })
            }

        })

    })








})
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router
