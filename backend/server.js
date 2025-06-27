const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const app = express()
const port = 3000
const bodyparser = require('body-parser');
const cors = require('cors');


app.use(bodyparser.json());
app.use(cors())

dotenv.config()
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassOP';
client.connect();

//Get all the Passwords
app.get('/',async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
})

//Save a Passwords
app.post('/',async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password)
  res.json({success:true, result: findResult});
})

//Detete a Password by id
app.delete('/',async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password)
  res.json({success:true, result: findResult});
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
