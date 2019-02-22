const mongosse = require('mongoose')
mongosse.connect('mongodb://localhost:27017/products', {useNewUrlParser: true},(err)=>{

if(err)
{
    console.log('erreur ')
    
}
else {
    console.log('connected successfuly')
}


})