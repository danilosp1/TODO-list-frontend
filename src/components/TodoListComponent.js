import React from 'react';
import TodoItem from './TodoItem'
import { Droppable } from 'react-beautiful-dnd'

const TodoList = ({ column, tasks, onDeleteTask }) => {

    if (!column) {
        return null;
    }

    return (
        <div className='m-2 border-2 border-quaternary-400 rounded-sm bg-secondary-400 sm:min-w-64'>
            <div className='p-2 text-quaternary-400 text-3xl font-bold'>
                {column.title}
            </div>
            <Droppable droppableId={column._id} key={column._id} type='group'>
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='p-2 text-quaternary-400 text-xl'
                    >
                        {tasks.map((task, index) => <TodoItem key={task._id} task={task} index={index} onDeleteTask={onDeleteTask}></TodoItem>)}
                        {provided.placeholder}
                        <button className='border-2 border-quaternary-400 bg-secondary-200 hover:bg-tertiary-200 transition-all hover:cursor-pointer hover:rounded-2xl p-2 mb-2 flex items-center justify-center text-center font-bold pt-1 w-full'>
                            +
                        </button>
                    </div>
                )}
            </Droppable>

        </div>
    )
}

export default TodoList;