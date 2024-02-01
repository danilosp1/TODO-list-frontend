import { Draggable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import * as api from '../utils/api';

import React, { useState } from 'react';

const TodoItem = ({ task, index, onDeleteTask, onChangeCompleted }) => {
    const [completed, setCompleted] = useState(task.completed)

    const styles = {
        notComplete: 'border-2 border-quaternary-400 rounded-sm p-2 mb-2 flex flex-row items-center justify-between bg-secondary-400',
        complete: 'border-2 border-quaternary-400 rounded-sm p-2 mb-2 flex flex-row items-center justify-between bg-secondary-200 line-through'
    }

    // Responsável por alterar o status de completed do item
    const changeCompleted = async () => {
        try {
            const item = await api.fetchTodoItem(task._id);

            const novoItem = await api.updateTodoitem(task._id, { content: item.content, completed: !item.completed, list: item.list});

            setCompleted(!item.completed);
            
            onChangeCompleted(task.list, novoItem);
        } catch (error) {
            console.error("Erro ao alterar status da task:", error);
        }
    }

    // Handler para deletar item
    const handleDelete = async () => {
        try {
            await api.deleteTodoTask(task._id);

            onDeleteTask(task._id);
        } catch (error) {
            console.error("Erro ao deletar task:", error);
        }
    }

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
                    className={completed ? styles.complete : styles.notComplete}
                >
                    <div className='flex flex-row items-center justify-start gap-2'>
                        <button onClick={changeCompleted} className={`w-4 h-4 min-h-4 min-w-4 ${completed ? 'bg-quaternary-400' : 'bg-tertiary-200'} border-2 border-quaternary-400`}></button>
                        
                        <div className='pb-1'>{task.content}</div>
                    </div>
                    <button onClick={handleDelete} className='text-quaternary-400 hover:text-delete-400 m-1'><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
            )}
        </Draggable>
    )
}

export default TodoItem;