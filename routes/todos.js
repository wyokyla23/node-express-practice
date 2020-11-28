import Express from 'express'
import { createTodo, getTodos, getTodo, deleteTodo, updateUser } from '../controllers/todos.js'

const router = Express.Router()

router.get('/', getTodos)

router.post('/', createTodo)

router.get('/:id', getTodo)

router.delete('/:id', deleteTodo)

router.patch('/:id', updateUser)

export default router