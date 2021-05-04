const { response, log} = require('../../locale/messages');
const todoService = require('./../services/todoService');
const {RESPONSE_STATUS, HTTP_CODES }= require('../../constants/constants');
const logger = require('../utils/logging');

exports.create = async (req, res, next) =>{
    logger.info({ payload: req.body}, log.todo.info.create);
    try {
        let body = {...req.body};
        body.createdOn = new Date().toISOString();
        logger.info({ payload: body}, log.todo.info.create);
        const todo = await todoService.createTodo(body);
        return res.status(HTTP_CODES.CREATED).json({  status:  RESPONSE_STATUS.SUCCESS , msg: response.todo.createSuccess, data: { todoId: todo._id} });

    }catch (err) {
        logger.error({ err }, log.todo.error.create);
        return next (new ApiError( log.todo.error.create, HTTP_CODES.BAD_REQUEST));
    } 
};

exports.deleteTodo = async(req, res, next) => {
    logger.info({ body : req.body }, log.todo.info.delete);
    let body = req.body;
    try {
        let todo = {
            deleted : true,
        } 
        let updatedAlert = await todoService.updateTodoWithSet({ _id : body.todoId }, { $set : todo } );
        if(updatedAlert && updatedAlert.n > 0){
            return res.status(HTTP_CODES.OK).json({ status : RESPONSE_STATUS.SUCCESS , msg : response.todo.deleteSuccess, data : updatedAlert});
        }else {
            return res.status(HTTP_CODES.BAD_REQUEST).json({ status : RESPONSE_STATUS.ERROR , msg : response.todo.deleteFail });
        }
    }
    catch (err) {
        logger.error({ err }, log.todo.error.delete);
        return next (new ApiError( log.todo.error.delete, HTTP_CODES.BAD_REQUEST));
    }
}; 

exports.getTodoList = async( req, res, next) => {
    
    logger.info({ payload: req.body}, log.todo.info.fetch);
    try {
        const body = {...req.body};

       let todoList = await todoService.findTodoList(body);

       return res.status(HTTP_CODES.OK).json({ status:  RESPONSE_STATUS.SUCCESS , msg: response.todo.fetchList, data: todoList });

    }catch (err) {
        logger.error({ err }, log.todo.error.fetch);
        return next (new ApiError( log.todo.error.fetch, HTTP_CODES.BAD_REQUEST));
    }
};

exports.completeTodo = async(req, res, next) => {
    logger.info({ body : req.body }, log.todo.info.complete);
    let body = req.body;
    try {
        let todo = {
            status : 'complete',
        } 
        let updatedAlert = await todoService.updateTodoWithSet({ _id : body.todoId }, { $set : todo } );
        if(updatedAlert && updatedAlert.n > 0){
            return res.status(HTTP_CODES.OK).json({ status : RESPONSE_STATUS.SUCCESS , msg : response.todo.completeSuccess, data : updatedAlert});
        }else {
            return res.status(HTTP_CODES.BAD_REQUEST).json({ status : RESPONSE_STATUS.ERROR , msg : response.todo.completeFail });
        }
    }
    catch (err) {
        logger.error({ err }, log.todo.error.complete);
        return next (new ApiError( log.todo.error.complete, HTTP_CODES.BAD_REQUEST));
    }
}; 

