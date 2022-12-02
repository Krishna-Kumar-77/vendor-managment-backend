const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const dbConnect = require('./db/db');

dbConnect()
const app = express()
port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/',(req, res) => {
  res.status(200).json({message: "hellow from the server"})
})

app.use('/users', require('./routes/userRoutes'))
app.use('/vendors', require('./routes/vendorRoutes'))


app.use(errorHandler);

app.listen(port, () => console.log(`server stated on port ${port}`)); 


