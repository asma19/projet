const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/products");

    const mongod = mongoose.connection;

    mongod.once('open', function (){
        mongod.db.createCollection("Recipe", function(){
            console.log("done");
        })
    })


