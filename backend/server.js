const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// const db = require('./app/models');
// db.sequelize.sync();
var corOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corOptions))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req, res)=>{
  res.json({message: 'Welcome to my application'})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log(`Server is running on Port ${PORT}!`);
})


const db = require('./config/dbConfig')

app.get('/users', db.getUsers)
app.get('/users/:name', db.getUserByName)
app.post('/users', db.createUser)
