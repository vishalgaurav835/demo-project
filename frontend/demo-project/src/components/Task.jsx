import React from 'react';

function Task(props) {
    return (
        <div
            className="task"
            style={{ textDecoration: props.task.status == "complete" ? "line-through" : "" }}
        >
            {props.task.title}

            <button style={{ background: "red" }} onClick={() => props.removeTask(props.index)}>x</button>
            <button onClick={() => props.completeTask(props.index)}>Complete</button>
        </div>
    );
}

export default Task;