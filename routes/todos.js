const Express = require('express')
const {
  createTodo, getTodos, getTodo, deleteTodos, deleteTodo, updateTodo,
} = require('../controllers/todos')

const router = Express.Router()

router.get('/', getTodos)

router.post('/', createTodo)

router.get('/:id', getTodo)

router.delete('/', deleteTodos)

router.delete('/:id', deleteTodo)

router.patch('/:id', updateTodo)

module.exports = router
