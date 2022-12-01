const path = require('path')
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

app.use('/users', require('./routes/userRoutes'))
app.use('/vendors', require('./routes/vendorRoutes'))

// Server frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }

app.use(errorHandler);

app.listen(port, () => console.log(`server stated on port ${port}`)); 


