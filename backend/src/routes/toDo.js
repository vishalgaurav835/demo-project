const express = require('express');
const todoController = require('../controllers/todoController');

const todoValidation = require('../validation/todoValidation');
const validate = require('../validation/validate');

const router = express.Router();

router.route('/create')
       .post(validate(todoValidation.todo), todoController.create);

router.route('/list/')
       .post(validate(todoValidation.filterTodoList), todoController.getTodoList);
        
router.route('/delete')
       .post(todoController.deleteTodo);
        
router.route('/complete')
       .post(todoController.completeTodo);


module.exports = router;