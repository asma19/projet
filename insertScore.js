const express = require("express")
const Product = require('./models/Product')
const db = require('./config/database')

const score = function (data) {
    s= 'Not enough information';
    if (data.nutriments != null) {
        const nutriments = data.nutriments;
        if (nutriments.sugars_100g != null && nutriments.energy_100g != null && nutriments.fiber_100g != null && nutriments.sodium_100g != null&&
            nutriments.proteins_100g != null &&nutriments['saturated-fat_100g']!= null) {
            s=compute_score(nutriments);
        }
    }
    console.log("score : " + s); return s;
}

const compute_score= function(nutriments){
    var pointN =0
    var pointP= 0
    const proteins = nutriments.proteins_100g;
    const fibers = nutriments.fiber_100g;
    const sodium = nutriments.sodium_100g;
    const saturatedFat = nutriments['saturated-fat_100g'];
    const sugars = nutriments.sugars_100g;
    const energy = nutriments.energy_100g;

    
    if (saturatedFat > 10) {
        if (proteins > 8) {
            pointP += 5;
            } else if (proteins > 6.4) {
                pointP += 4;
            } else if (proteins > 4.8) {
                pointP += 3;
            } else if (proteins > 3.2) {
                pointP -= 2;
            } else if (proteins > 1.6) {
                pointP += 1;
            }
            if (fibers > 3.5) {
                pointP += 5;
                } else if (fibers > 2.8) {
                    pointP += 4;
                } else if (fibers > 2.1) {
                    pointP += 3;
                } else if (fibers > 1.4) {
                    pointP += 2;
                } else if (fibers > 0.7) {
                    pointP += 1;
                }
        pointN += 10;
        } else if (saturatedFat > 9) {
            pointN += 9;
        } else if (saturatedFat > 8) {
            pointN += 8;
        } else if (saturatedFat > 7) {
            pointN += 7;
        } else if (saturatedFat > 6) {
            pointN += 6;
        } else if (saturatedFat > 5) {
            pointN += 5;
        } else if (saturatedFat > 4) {
            pointN += 4;
        } else if (saturatedFat > 3) {
            pointN += 3;
        } else if (saturatedFat > 2) {
            pointN += 2;
        } else if (saturatedFat > 1) {
            pointN += 1;
        }
        if (sugars > 13.5) {
            pointN += 10;
        } else if (sugars > 12) {
            pointN += 9;
        } else if (sugars > 10.5) {
            pointN += 8;
        } else if (sugars > 9) {
            pointN += 7;
        } else if (sugars > 7.5) {
            pointN += 6;
        } else if (sugars > 6) {
            pointN += 5;
        } else if (sugars > 4.5) {
            pointN += 4;
        } else if (sugars > 3) {
            pointN += 3;
        } else if (sugars > 1.5) {
            pointN += 2;
        } else if (sugars >= 0) {
            pointN += 1;
        }
        if (energy > 3350) {
            pointN += 10;
        } else if (energy > 3015) {
            pointN += 9;
        } else if (energy > 2680) {
            pointN += 8;
        } else if (energy > 2345) {
            pointN += 7;
        } else if (energy > 2010) {
            pointN += 6;
        } else if (energy > 1675) {
            pointN += 5;
        } else if (energy > 1340) {
            pointN += 4;
        } else if (energy > 1005) {
            pointN += 3;
        } else if (energy > 670) {
            pointN += 2;
        } else if (energy > 335) {
            pointN += 1;
        }
        if (sodium > 0.9) {
            pointN += 10;
            } else if (sodium > 0.81) {
            pointN += 9;
            } else if (sodium > 0.72) {
            pointN += 8;
            } else if (sodium > 0.63) {
            pointN += 7;
            } else if (sodium > 0.54) {
            pointN += 6;
            } else if (sodium > 0.45) {
            pointN += 5;
            } else if (sodium > 0.36) {
            pointN += 4;
            } else if (sodium > 0.27) {
            pointN += 3;
            } else if (sodium > 0.18) {
            pointN += 2;
            } else if (sodium > 0.09) {
            pointN += 1;
            }

        var score = pointN -pointP
        if (score<3){
            nutri_score='A'}

        else if (score<6){
            nutri_score='B'}
        else if (score<13){
            nutri_score='C'

        }
        else if (score<21){
            nutri_score='D'

        }
        else {nutri_score='E'}
        return nutri_score;


}


Product.find({}, (err, products) => {products.map(prod => {
    Product.update({'_id':prod._id}, {'score':score(prod)},{multi:true}, function (err) {
        
        if (err) {
            console.log(err)
       
        } else {
         
          

            
       
        }
    })

})
    })