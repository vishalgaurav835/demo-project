const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title:                  { type: String, required: true, trim: true },
    deleted:                { type: Boolean, required: true },
    status:                 { type: String, required: true},
    createdOn:              { type: Date, required: true },
});


todoSchema.pre(/^find/, function(next) {
    this.select('-__v');
    next();
})

mongoose.set('debug', function (coll, method, query, doc) {
   console.log(query)
});

const Todo = mongoose.model('todos', todoSchema);
module.exports = Todo;