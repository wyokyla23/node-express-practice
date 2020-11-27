import Express from 'express'
import Products from './products.js'

const app = Express()
const port = 3000
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

function middleware(request, response, next) {
  console.log(request.query)
  console.log(request.params)
  next()
}

// GET, PUT, POST, DELETE 
// app.get(), app.put(), app.post(), app.delte()

app.get("/products/:id", middleware, (request, response) => {
  // response.send("Hello world")
  // response.send(Products)
  response.json(Products.find((product) => {
    return parseInt(request.params.id) === product.id
  }))
})

app.post('/add', (request, response) => {
  console.log(request.body.id)
  response.sendStatus(200)
})



app.listen(port, () => console.log("listening on port" + port))
