const express = require("express")
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const Product = require('./models/product');
//POST to PUT
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true})) //for app.post
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(()=>{
    console.log("MONGO Connection established..");
})
.catch(err=>{
    console.log(err);
    console.log("Mongo connection error");
});

const categories =['fruits','vegetables','dairy']

app.get('/products', async(req,res)=>{
    const products = await Product.find({})
    console.log(products)
    res.render('products/index', {products})
})
app.get('/products/:id/edit', async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product, categories})
})
app.post('/products', async (req,res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/new',(req,res)=>{
    res.render('products/new', { categories })
})

app.get('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id)
    res.render('products/show', {product})
})

//put request for changing an object
//use npm i method-override because we are overriding POST to PUT

app.get('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const product= await Product.findByIdAndUpdate(id, req.body,{runValidators: true, new: true});
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async (req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
})

app.listen(3000,()=>{
    console.log("LISTENING ON PORT 3000")
})


