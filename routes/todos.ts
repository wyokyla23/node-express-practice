import Express from 'express'
import {
  createTodo, getTodos, getTodo, deleteTodos, deleteTodo, updateTodo,
} from '../controllers/todos'

const router = Express.Router()

router.get('/', getTodos)

router.post('/', createTodo)

router.get('/:id', getTodo)

router.delete('/', deleteTodos)

router.delete('/:id', deleteTodo)

router.patch('/:id', updateTodo)

export default router