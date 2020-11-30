const { v4: uuidv4 } = require('uuid')
const client = require('../adapters/postgres')
// should be const
const todos = [
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
  const { id, task, completed } = todoWithId

  const query = {
    text: 'INSERT INTO todos(task_id, task, completed) VALUES($1, $2, $3)',
    values: [id, task, completed],
  }

  client.query(query)
    .then((res) => console.log(res))
    .catch((error) => console.log(error.stack))
}

// /todos/2 => request.params { id: 2 }
exports.getTodos = async (_, response) => {
  const value = await client.query('SELECT * FROM todos')
    .then((res) => response.send(res.rows))
    .catch((error) => console.log(error.stack))
}

// const foundTodo = todos.find((todo) => todo.id === id)
exports.getTodo = async (request, response) => {
  const { id } = request.params
  const query = {
    name: 'fetch-todo',
    text: 'SELECT * FROM todos WHERE task_id = $1',
    values: [id],
  }
  const value = await client.query(query)
    .then((res) => response.send(res.rows))
    .catch((error) => console.log(error.stack))
}

// const updatedTodos = todos.filter((todo) => todo.id != Number(id))
exports.deleteTodo = async (request, response) => {
  const { id } = request.params
  const query = {
    name: 'delete-todo',
    text: 'DELETE FROM todos WHERE task_id = $1',
    values: [id],
  }
  const value = await client.query(query)
  // .then((res) => response.send(res.rows))
  // .catch((error) => console.log(error.stack))
}

exports.updateUser = (request, response) => {
  const { id } = request.params
  const { task, completed } = request.body
  const foundTodo = todos.find((todo) => todo.id === id)
  if (task) foundTodo.task = task
  if (completed) foundTodo.completed = completed

  response.send(foundTodo)
}
