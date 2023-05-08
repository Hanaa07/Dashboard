const express = require('express'); 
const connectDB = require('./config/mongodb');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require("dotenv").config();
const absRoute = require('./Routes/absenceCRUD');
const userRoute = require('./Routes/userCRUD');
const mongoose = require('mongoose');


//connect database
connectDB();

const app = express()
const PORT = process.env.PORT

app.use(express.json({ extended: false }))
app.use(express.urlencoded())

app.use(cookieParser())

app.get("/", (req, res) => res.send("Server up and running"));

app.use(
    session({
      secret: 'APODAJDSDASMCZXMZADASDASDPASDOASDSAK',
      resave: false,
      saveUninitialized: false,
    })
  );
  
app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
  });

app.use('/api/v1/absenceCRUD', absRoute);
app.use('/api/v1/userCRUD', userRoute);

app.listen(PORT, () => {
  console.log(`Running Express Server on Port ${PORT}!`)});


