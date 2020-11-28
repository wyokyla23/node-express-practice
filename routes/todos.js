import Express from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = Express.Router()

const todos = [
  {
    task: "shave grandma",
    id: 1,
    completed: "false"
  },
  {
    task: "rock around the clock",
    id: 2,
    completed: "true"
  }
]

router.get('/', (request, response) => {
  response.send(todos)
  console.log(todos)
})

router.post('/', (request, response) => {
  const todo = request.body
  const todoWithId = { ...todo, id: uuidv4() }
  todos.push(todoWithId)

  response.send(todos)
  // response.send(`${todo} was added to the database.`)
})


// /todos/2 => request.params { id: 2 }
router.get('/:id', (request, response) => {
  const { id } = request.params
  const foundTodo = todos.find((todo) => todo.id === Number(id))
  response.send(foundTodo)
})

export default router