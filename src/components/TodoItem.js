import { Draggable } from 'react-beautiful-dnd'

import React from 'react';

const TodoItem = ({ task, index }) => {

    if (!task) {
        return null;
    }

    return (
        <Draggable draggableId={task._id} key={task._id} index={index}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className='border-2 border-quaternary-400 rounded-sm p-2 mb-2'
                >
                    {task.content}
                </div>
            )}
        </Draggable>
    )
}

export default TodoItem;