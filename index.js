require('dotenv').config()
const Express = require('express')
const todosRoutes = require('./routes/todos')
const client = require('./adapters/postgres')

const app = Express()
const port = 4000

app.use(Express.json()) //Used to parse json bodies
app.use(Express.urlencoded({ extended: true }))
app.use('/todos', todosRoutes)

// client.query('SELECT * FROM todos', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

app.listen(port, () => console.log(`listening on port ${port}`))

module.exports = {
  port
}