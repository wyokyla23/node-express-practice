import Express from 'express'
import Products from './products.js'

const app = Express()
const port = 3000

// GET, PUT, POST, DELETE 
// app.get(), app.put(), app.post(), app.delte()

app.get("/products/:id", (request, response) => {
  // response.send("Hello world")
  // response.send(Products)
  response.json(Products.find((product) => {
    return parseInt(request.params.id) === product.id
  }))
})

app.post('/add', (request, response) => {
  response.send(request.body)
})

app.listen(port, () => console.log("listening on port" + port))
