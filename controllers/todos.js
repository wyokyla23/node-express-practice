const { uuidv4 } = require('uuid')
const client = require('../adapters/postgres')
// should be const
let todos = [
  {
    task: 'shave grandma',
    id: '76788758hb87b78',
    completed: 'false',
  },
  {
    task: 'rock around the clock',
    id: 'uyhughjg',
    completed: 'true',
  },
]

exports.createTodo = (request, response) => {
  const todo = request.body
  const todoWithId = { ...todo, id: uuidv4() }
  todos.push(todoWithId)
  // const newTodos = [...todos, todoWithId]
  response.send(todos)
  // response.send(`${todo} was added to the database.`)
}

// /todos/2 => request.params { id: 2 }
exports.getTodos = () => client.query('SELECT * FROM todos', (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.fields)
  }
})

exports.getTodo = (request, response) => {
  const { id } = request.params
  const foundTodo = todos.find((todo) => todo.id === id)
  response.send(foundTodo)
}

exports.deleteTodo = (request, response) => {
  const { id } = request.params
  // const updatedTodos = todos.filter((todo) => todo.id != Number(id))
  todos = todos.filter((todo) => todo.id != id)
  response.send(todos)
}

exports.updateUser = (request, response) => {
  const { id } = request.params
  const { task, completed } = request.body
  const foundTodo = todos.find((todo) => todo.id === id)
  if (task) foundTodo.task = task
  if (completed) foundTodo.completed = completed

  response.send(foundTodo)
}
