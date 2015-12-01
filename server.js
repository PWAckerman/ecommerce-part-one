"use strict";
let express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongo = require('mongojs'),
    app = express(),
    db = mongo('ecommerce', ['products']),
    port = 3030

app
  .use(bodyParser.json())
  .use(morgan('combined'))
  .use(express.static(`${__dirname}/public`))
  .post('/products', (req, res) => {
        db.products.insert(req.body, (err, result) => !err ? res.status(201).send(result): res.send(400, err))
      })
  .get('/products/:id', (req, res) => {
      db.products.findOne({_id: mongo.ObjectId(req.params.id)}, (err, results) => !err ? res.status(200).send(results) : console.log('Nope'))
  })
  .get('/products', (req, res) => {
      db.products.find({}, (err, results) => !err ? res.status(200).send(results) : console.log('Nope'))
  })
  .put('/products/:id', (req, res) => {
      db.products.update({_id: mongo.ObjectId(req.params.id)}, {$set: req.body}, (err, results) => !err ? res.status(200).send(results) : console.log('Nope'))
  })
  .delete('/products/:id', (req, res) => {
      db.products.remove({_id: mongo.ObjectId(req.params.id)}, (err, results) => !err ? res.status(200).send(results) : console.log(err))
  })
  .listen(port, (err) => !err ? console.log(`Server is running on ${port}`) : console.log(err));

  db.on('connect', () =>
    console.log('Connected!')
  )
