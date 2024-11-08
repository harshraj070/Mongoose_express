const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("MONGO Connection established..");
    })
    .catch(err => {
        console.log("Mongo connection error");
        console.log(err);
    });

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'dairy'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    }
];

Product.insertMany(seedProducts)
    .then(res => {
        console.log("Products successfully inserted:");
        console.log(res);
    })
    .catch(e => {
        console.log("Failed to insert products:");
        console.log(e);
    });
