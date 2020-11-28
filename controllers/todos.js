import { v4 as uuidv4 } from 'uuid'

//should be const
let todos = [
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

export const createTodo = (request, response) => {
  const todo = request.body
  const todoWithId = { ...todo, id: uuidv4() }
  todos.push(todoWithId)
  // const newTodos = [...todos, todoWithId]
  response.send(todos)
  // response.send(`${todo} was added to the database.`)
}

// /todos/2 => request.params { id: 2 }
export const getTodos = (request, response) => {
  response.send(todos)
  console.log(todos)
}

export const getTodo = (request, response) => {
  const { id } = request.params
  const foundTodo = todos.find((todo) => todo.id === Number(id))
  response.send(foundTodo)
}

export const deleteTodo = (request, response) => {
  const { id } = request.params
  // const updatedTodos = todos.filter((todo) => todo.id != Number(id))
  todos = todos.filter((todo) => todo.id != Number(id))
  response.send(todos)
}

export const updateUser = (request, response) => {
  const { id } = request.params
  const { task, completed } = request.body
  const foundTodo = todos.find((todo) => todo.id === Number(id))
  if (task) foundTodo.task = task
  if (completed) foundTodo.completed = completed

  response.send(foundTodo)
}