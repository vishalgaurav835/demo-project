const Todo = require('./../models/todo'); 
const mongoose = require('mongoose');
const { FILTER_SEARCH_KEYS } = require('../../constants/constants');

const createTodo = (body) => {
   return  Todo.create(body);
 }
  
const updateTodoWithSet = (query,body) => {
    return Todo.updateOne(query, body);
}

const findTodoList = (body) => {
  
    let query = Todo.find();
    const features = new APIFeatures(query, body)
    .status()
    .filterDeleted()

    return features.query;
  }

  
class APIFeatures {
    constructor(query, body) {
        this.query = query;
        this.filter = body.filter;
    }
  status() {
    const status =  this.filter.status ? this.filter.status : '';
    if(status)
    {
      this.query = this.query.where(FILTER_SEARCH_KEYS.STATUS, status)
    }
    return this;
  }

  filterDeleted() {
    this.query = this.query.where(FILTER_SEARCH_KEYS.DELETED, false);
    return this;
  }
  
}


module.exports = {
    createTodo,
    updateTodoWithSet,
    findTodoList
};