const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')

// DotENV
dotenv.config()



// Mongo DB Connection
connectDB();

// Rest Object
const app = express()

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// Routes
app.use('/api/v1/auth', require('./routes/userRoutes'));
app.use('/api/v1/otp', require('./routes/otpRoute'));

// Port+
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT,() => {
    console.log(`Server is Runing ${PORT}`.bgGreen.white)
} )


