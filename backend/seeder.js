const mongoose = require('mongoose')
const dotenv = require('dotenv')

const connectDb = require('./config/dbConnection')
const users = require('./data/users')
const products = require('./data/products')
const User = require('./model/userModel')
const Product = require('./model/productModel')
const Order = require('./model/orderModel')

dotenv.config()
connectDb()

const importData = async () => {
    try {
            await Order.deleteMany()
            await Product.deleteMany()
            await User.deleteMany()

            const createdUsers = await User.insertMany(users)
            const adminUser = createdUsers[0]._id

            sampleProducts = products.map( product => {
                return {...product, user: adminUser}
            })
            await Product.insertMany(sampleProducts)
            console.log(`Imported data sucessfully...`)
            process.exit()
    } catch (error) {
        console.error(`${error} while importing the data`)
        process.exit(1)
    }
}
const destroyData = async ()=>{
    try {
        await Order.deleteMany()
            await Product.deleteMany()
            await User.deleteMany()
    } catch (error) {
        console.error(`${error} while destroying the data`)
        process.exit(1)
    }
}

if(process.argv[2] == '-d'){
    destroyData();
}else{
    importData();
}