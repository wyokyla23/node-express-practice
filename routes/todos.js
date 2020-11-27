import Express from 'express'

const router = Express.Router()

const todos = [
  {
    task: "buy milk",
    id: 1,
    completed: "false"
  }
]

router.get('/', (request, response) => {
  response.send(todos)
  console.log(todos)
})

export default router