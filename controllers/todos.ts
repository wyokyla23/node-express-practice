import { Request, Response } from "express"

import { uuid as uuidv4 } from 'uuidv4'
import client from '../adapters/postgres'

export const createTodo = async (request: Request, response: Response) => {
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

export const getTodos = async (_: Request, response: Response) => {
  const value = await client.query('SELECT * FROM todos')
  response.send(value.rows)
}

export const getTodo = async (request: Request, response: Response) => {
  const { id } = request.params
  const query = {
    name: 'fetch-todo',
    text: 'SELECT * FROM todos WHERE task_id = $1',
    values: [id],
  }
  const value = await client.query(query)
  response.send(value.rows)
}

export const deleteTodos = async (request: Request, response: Response) => {
  const query = {
    name: 'delete-todos',
    text: 'DELETE FROM todos',
  }
  await client.query(query)
  response.send()
}

export const deleteTodo = async (request: Request, response: Response) => {
  const { id } = request.params
  const query = {
    name: 'delete-todo',
    text: 'DELETE FROM todos WHERE task_id = $1',
    values: [id],
  }
  await client.query(query)
  response.send(id)
}

export const updateTodo = async (request: Request, response: Response) => {
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
