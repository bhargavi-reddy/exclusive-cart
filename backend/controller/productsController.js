const asyncHandler = require('express-async-handler')
const Product = require('../model/productModel')

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.page)|| 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'

        }
    } : {}
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
    res.json({products, page, pages : Math.ceil(count/pageSize)})
})
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product deleted succesfully' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Name',
        description: 'Sample Description',
        price: 0,
        image: '/images/sample.jpeg',
        countInStock: 0,
        user: req.user._id,
        brand: 'Sample Brand',
        category: 'Sample Category',
        numReviews: 0
    })
    const createdProduct = await product.save();
    if (createProduct) {
        res.status(201).json(createdProduct)
    } else {
        res.status(500);
        throw new Error('Error while creating sample product..')
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, countInStock, image, brand, category, price } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.countInStock = countInStock || product.countInStock;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.price = price || product.price;
        product.user = req.user._id

        const updatedProduct = await product.save()
        res.status(201);
        res.json(updatedProduct)
    } else {
        res.status(401)
        res.json({ message: 'Product not found...' })
    }
})


const createReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error(`Product already reviewed`)
        }
        const review = {
            name: req.user.name,
            comment: comment,
            rating: Number(rating),
            user: req.user._id,
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.numReviews
        await product.save()
        res.status(201).json({message: `Review is added...`})
    } else {
        res.status(401)
        res.json({ message: 'Product not found...' })
    }
})

const getTopRatedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating : -1}).limit(3)
    res.json(products)
})
module.exports = { getProductById, getProducts, deleteProduct, createProduct,updateProduct,createReview, getTopRatedProducts }