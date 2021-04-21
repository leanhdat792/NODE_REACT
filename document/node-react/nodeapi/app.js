const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

//db
//MONGO_URI=mongodb://localhost/nodeapi
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Database Connected");
})

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});

//bring in routes
const postRoutes = require('./routes/post');

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/', postRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello from node js update');
// });

const port = 8080;
app.listen(port, () => {console.log(`A Node Js API is listening on port: ${port}`)});