const express = require('express')
const router = express.Router()
const {getProducts, getProductById, deleteProduct, createProduct, updateProduct, createReview, getTopRatedProducts} = require('../controller/productsController')
const {validateUser, isAdmin} = require('../middleware/authorizationMiddleware')

router.route('/').get(getProducts).post(validateUser, isAdmin, createProduct)
router.route('/top').get(getTopRatedProducts)

router.route('/:id').get(getProductById)
                    .delete(validateUser, isAdmin, deleteProduct)
                    .put(validateUser, isAdmin, updateProduct)
router.route('/:id/reviews').post(validateUser,createReview )

module.exports = router