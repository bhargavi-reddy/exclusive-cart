const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const morgan = require('morgan')
const connectDb = require('./config/dbConnection')
const router = require('./routes/productRoutes')
const usersRoute = require('./routes/userRoutes')
const orderRoute = require('./routes/orderRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const uploadRoute = require('./routes/uploadRoutes')

const app = express();

dotenv.config();

const PORT = process.env.PORT
const ENV = process.env.NODE_ENV

__dirname = path.resolve()

connectDb();

app.use(express.json())


app.use('/api/products', router)
app.use('/api/users', usersRoute)
app.use('/api/orders', orderRoute)

app.use('/api/upload', uploadRoute)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAY_PAL_CLIENT_ID))


if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

app.use(notFound)
app.use(errorHandler)

app.listen(5000, (req, res) => {
    console.log(`Server is running in ${ENV} mode on port ${PORT}...`)
})