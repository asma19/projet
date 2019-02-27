const express = require("express")
const router = express.Router()
const Product = require('../models/Product')
const Recipe = require('../models/Recipe')
const fs = require('fs')
var util = require('util')
    //route to recette page
    router.get('/recette', function (req, res) {
        res.render('product/recette')
    })

    //insert recipe
    router.post('/affRecette', async function (req, res) {
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
        let verif = 0
        await Product.find({ categories: ing1 }, function (err, allProd1) {
            if (err) {
                error: req.flash('error')

            } 
            if (allProd1.length == 0) {
                    verif=verif+1
                    console.log(verif)
                };
        });
        console.log(verif)
        await Product.find({ categories: ing2 }, function (err, allProd2) {
            if (err) {
                error: req.flash('error')

            } else
                if (allProd2.length == 0) {
                    verif++
                };
        });
        console.log(verif)
        if (ing3.length != 0) {
            await Product.find({ categories: ing3 }, function (err, allProd3) {
                if (err) {
                    error: req.flash('error')

                } else
                    if (allProd3.length == 0) {
                        verif++
                    };
            });
        }
        console.log(verif)
        if (ing4.length != 0) {
            await Product.find({ categories: ing4 }, function (err, allProd4) {
                if (err) {
                    error: req.flash('error')

                } else
                    if (allProd4.length == 0) {
                        verif++
                    };
            });
        }
        console.log(verif)
        if (verif == 0) {
            Recipe.create({ recipe_name: name, ingredient1: ing1, ingredient2: ing2, ingredient3: ing3, ingredient4: ing4, description: des }, function (err, results) {

                if (err) {
                    console.log(err)

                }
                else {
                    res.json(results);

                }
            })
        }
    });
    router.get('/showr', function (req, res) {  
          if (req.query.search) {
            const regex = new RegExp(escapeRegex(req.query.search), 'gi')
            Recipe.find({ recipe_name: regex }, function (err, allrecipes) {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ recipes: allrecipes })
                }
            })
        } else {

            Recipe.find({}, function (err, allrecipes) {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ recipes: allrecipes })
                }
            })
        }

    })
    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

module.exports = router