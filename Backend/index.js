const express = require('express'); 
const connectDB = require('./config/mongodb');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require("dotenv").config();
const absenceRoute = require('./Routes/absence.routes');
const userRoute = require('./Routes/user.routes');
const soldeRoute = require('./Routes/solde.routes');
const mongoose = require('mongoose');
const cors = require("cors");

//connect database
connectDB();

const app = express()
const PORT = process.env.PORT

app.use(cors());

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

app.use('/api/absence', absenceRoute);
app.use('/api/user', userRoute);
app.use('/api/solde', soldeRoute);

app.listen(PORT, () => {
  console.log(`Running Express Server on Port ${PORT}!`)});


