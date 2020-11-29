const Express = require('express')
const {
  createTodo, getTodos, getTodo, deleteTodo, updateUser,
} = require('../controllers/todos')

const router = Express.Router()

router.get('/', getTodos)

router.post('/', createTodo)

router.get('/:id', getTodo)

router.delete('/:id', deleteTodo)

router.patch('/:id', updateUser)

module.exports = router
