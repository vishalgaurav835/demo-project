import React, { Component } from 'react';
import './Todo.css';
import Task  from './Task'
import axios from 'axios';

class Todo extends Component {
    constructor(){
        super();
        this.state = {
            tasks: null,
            value: '',
            flagToDisplayCompleteOrIncompleteTodo: false
        }
    }
    componentDidMount(){
        this.fetchToDoList();
    }

    fetchToDoList = () => {
        axios.post( 'http://localhost:7080/v1/tds/toDo/list/', {"filter":{"status": ''}})
        .then( response => {
            this.setState({
                tasks: response.data.data
            })
        } )
        .catch( error => {
            alert("failed to fetch")
        } );
}
    
    addTask = (title) => {
        let addPayload = {
            "title": title,
            "deleted": false,
            "status": "uncomplete" 
        }
        axios.post( 'http://localhost:7080/v1/tds/toDo/create/', {...addPayload})
        .then( response => {
            this.fetchToDoList();
            alert("added successfully Todo")
        } )
        .catch( error => {
            alert("failed to add todo")
        } );
    };

    completeTask = index => {
        let newTasks = [...this.state.tasks];
        let payload = {
            "todoId": newTasks[index]._id
        }
        console.log("djkfkgkh",payload)
        axios.post( 'http://localhost:7080/v1/tds/toDo/complete/',{...payload})
        .then( response => {
            if(this.state.flagToDisplayCompleteOrIncompleteTodo){
                if(newTasks[index].status != 'complete'){
                    newTasks.splice(index, 1);
                    this.setState({
                        tasks: newTasks
                    })
                }
            }
            else{
            newTasks[index].status = 'complete';
            this.setState({
                tasks: newTasks
            })
            }
            alert("Todo successfully completed")
        } )
        .catch( error => {
            alert("failed to complete todo")
        } );
    };

    removeTask = index => {
        let newTasks = [...this.state.tasks];
        axios.post( 'http://localhost:7080/v1/tds/toDo/delete/', {"todoId": newTasks[index]._id})
        .then( response => {
            newTasks.splice(index, 1);
            this.setState({
                tasks: newTasks
            })
            alert("Todo successfully removed")
        } )
        .catch( error => {
            alert("failed to remove todo")
        } );
    };
    
    handleSubmit = e => {
        e.preventDefault();
        if (!this.state.value) return;
        this.addTask(this.state.value);
        this.setState({
            value: ''
        })
    }
    

CreateTask = () => {
    return (
        <form onSubmit={this.handleSubmit}>
            <input
                type="text"
                className="input"
                value={this.state.value}
                placeholder="Add a new task"
                onChange={e => this.setState({value: e.target.value})}
            />
        </form>
    );
}

handleAllTodoList = ( value = '') => {
      this.setState({
          flagToDisplayCompleteOrIncompleteTodo: value? true: false
      })
      axios.post( 'http://localhost:7080/v1/tds/toDo/list/', {"filter":{"status": value }})
        .then( response => {
            this.setState({
                tasks: response.data.data
            })
        } )
        .catch( error => {
            alert("failed to fetch")
        } );
}

render(){
    return (
        <div className="todo-container">
            <div className="header">Pending tasks ({this.state.tasks && this.state.tasks.length})</div>
            <div className="tasks">
                {this.state.tasks && this.state.tasks.map((task, index) => (
                    <Task
                    task={task}
                    index={index}
                    completeTask={this.completeTask}
                    removeTask={this.removeTask}
                    key={index}
                    />
                ))}
            </div>
            {!this.state.flagToDisplayCompleteOrIncompleteTodo ?
            <div className="create-task" >
                { this.CreateTask() }
            </div>
               : null }
            <div style={{ display: 'grid'}}>
                <button style={{ cursor: 'pointer',margin: '4px' }} onClick = { () =>  this.handleAllTodoList('') }>
                    All Todo
                </button>
                <button style={{  cursor: 'pointer',margin: '4px' }} onClick = {  () => this.handleAllTodoList('complete') }>
                    Completed Todo
                </button>
                <button style={{ cursor: 'pointer',margin: '4px' }} onClick = { () => this.handleAllTodoList('uncomplete') }>
                    Uncomplete Todo
                </button>
            </div>
        </div>
    );
}
}

export default Todo;