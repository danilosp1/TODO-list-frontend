import React, { useState } from 'react';
import TodoItem from './TodoItem'
import { Droppable } from 'react-beautiful-dnd'
import * as api from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const TodoList = ({ column, tasks, onDeleteTask, onCreateTask, onDeleteList }) => {
    const [modal, setModal] = useState(false);
    const [inputValue, setInputValue] = useState("");

    if (!column) {
        return null;
    }

    const handleCreateTask = async () => {
        try {
            const item = await api.createTodoTask({ content: inputValue, todoListId: column._id })
            onCreateTask(column._id, item);
        } catch (error) {
            console.error("Erro ao criar item:", error)
        }
        setInputValue("");
        handleCloseModal();
    }

    const handleOpenModal = () => {
        setModal(true);
    }

    const handleCloseModal = () => {
        setModal(false);
    }

    const handleDeleteList = async () => {
        try {
            await api.deleteTodoList(column._id);
            onDeleteList(column);
        } catch (error) {
            console.error("Erro ao deletar lista:", error)
        }
    }

    return (
        <div className='m-2 border-2 border-quaternary-400 rounded-sm bg-secondary-400 sm:min-w-64 relative min-h-52'>
            {
                modal ?
                    (
                        <div className='flex flex-col items-center absolute w-full h-full z-10 bg-secondary-200'>
                            <div className='m-2 text-quaternary-400 text-xl'>Adicionar item</div>
                            <div className='mb-2 text-quaternary-400 text-base'>Descrição</div>

                            <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} className='p-3 rounded-2xl focus:rounded-lg transition-all outline-none' type="text" />

                            <div className='mt-4 flex flex-row text-text-50 gap-4'>
                                <button onClick={handleCreateTask} className='border-2 border-quaternary-400 bg-secondary-200 hover:bg-tertiary-200 transition-all hover:cursor-pointer hover:rounded-2xl p-2 mb-2 flex items-center justify-center text-center font-bold pt-1 w-full text-quaternary-400'>Adicionar</button>

                                <button onClick={handleCloseModal} className='border-2 border-quaternary-400 bg-delete-400 transition-all hover:cursor-pointer hover:rounded-2xl p-2 mb-2 flex items-center justify-center text-center font-bold pt-1 w-full text-text-50'>Cancelar</button>
                            </div>
                        </div>
                    )
                    :
                    (
                        <></>
                    )
            }
            <div className='flex flex-row items-center justify-between p-2 text-quaternary-400 text-3xl font-bold'>
                <div>
                    {column.title}
                </div>
                <div>
                    <button onClick={handleDeleteList} className='text-quaternary-400 hover:text-delete-400 text-xl m-1'><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
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
                        <button onClick={handleOpenModal} className='border-2 border-quaternary-400 bg-secondary-200 hover:bg-tertiary-200 transition-all hover:cursor-pointer hover:rounded-2xl p-2 mb-2 flex items-center justify-center text-center font-bold pt-1 w-full'>
                            +
                        </button>
                    </div>
                )}
            </Droppable>

        </div>
    )
}

export default TodoList;