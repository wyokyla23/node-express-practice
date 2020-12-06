const { v4: uuidv4 } = require('uuid')
const client = require('../adapters/postgres')

exports.createTodo = async (request, response) => {
  const todo = request.body
  const todoWithId = { ...todo, id: uuidv4() }
  const { id, task, completed } = todoWithId

  const query = {
    text: 'INSERT INTO todos(task_id, task, completed) VALUES($1, $2, $3)',
    values: [id, task, completed],
  }

  await client.query(query)
  response.send(todoWithId)
}

exports.getTodos = async (_, response) => {
  const value = await client.query('SELECT * FROM todos')
  response.send(value.rows)
}

exports.getTodo = async (request, response) => {
  const { id } = request.params
  const query = {
    name: 'fetch-todo',
    text: 'SELECT * FROM todos WHERE task_id = $1',
    values: [id],
  }
  const value = await client.query(query)
  response.send(value.rows)
}

exports.deleteTodos = async (request, response) => {
  const query = {
    name: 'delete-todos',
    text: 'DELETE FROM todos',
  }
  await client.query(query)
  response.send()
}

exports.deleteTodo = async (request, response) => {
  const { id } = request.params
  const query = {
    name: 'delete-todo',
    text: 'DELETE FROM todos WHERE task_id = $1',
    values: [id],
  }
  await client.query(query)
  response.send(id)
}

exports.updateTodo = async (request, response) => {
  const { id } = request.params
  const { task, completed } = request.body
  const queryTask = {
    name: 'update-task',
    text: 'UPDATE todos SET task = $1 WHERE task_id = $2',
    values: [task, id],
  }
  const queryCompleted = {
    name: 'update-completed',
    text: 'UPDATE todos SET completed = $1 WHERE task_id = $2',
    values: [completed, id],
  }
  if (task) {
    const value = await client.query(queryTask)
    response.send(value.rows)
  } else if (completed) {
    const value = await client.query(queryCompleted)
    response.send(value.rows)
  }
}
