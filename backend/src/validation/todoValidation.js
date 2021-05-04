const Joi = require('@hapi/joi');

/* Validating the request parameter for alertsCreation */

const todo = {
    body: Joi.object().keys({
        status:             Joi.string().required().valid('complete','uncomplete'),
        title:              Joi.string().required(),   
        deleted:            Joi.boolean().required(),   
    }) 
}
const filterTodoList = {
    body: Joi.object().keys({
        filter : Joi.object().keys({
                status:        Joi.string().required().valid('complete','uncomplete').allow(''), 
    }) 
    }) 
}

module.exports = {
    todo,
    filterTodoList
  }