require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const assetsPath = path.join(__dirname,"public");
const indexRoute = require("./routes/index");
const newRoute = require('./routes/new');
const trainerRoute = require('./routes/trainer');
const elementRoute = require('./routes/element');
const addRoute = require('./routes/add');

app.use(express.static(assetsPath));
app.use(express.urlencoded({extended:true}));
app.use("/",indexRoute);
app.use('/new',newRoute);
app.use('/trainer',trainerRoute);
app.use('/trainer/:trainerId', elementRoute);
app.use('/trainer', addRoute);

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");

const port = process.env.SERVERPORT ||3000;

app.listen(port, '0.0.0.0', ()=> console.log(`the app is listening on port ${port}`));