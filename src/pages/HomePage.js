import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoListComponent';
import Header from '../components/Header';
import { DragDropContext } from 'react-beautiful-dnd';
import { useAuth } from '../hooks/useAuth';
import * as api from '../utils/api';
import { useNavigate } from "react-router-dom";


const Home = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [todoLists, setTodoLists] = useState([]);
    const [todoItems, setTodoItems] = useState({});
    const userId = localStorage.getItem('authId')

    useEffect(() => {
        const loadData = async () => {
            try {
                const lists = await api.fetchTodoLists();
                setTodoLists(lists);

                const itemsMap = {};

                for (const column of lists) {
                    const columnId = column._id;
                    const items = await api.fetchTodoItemsAll(columnId);
                    itemsMap[columnId] = items;
                }

                setTodoItems(itemsMap);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };

        loadData();
    }, [auth.id]);

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const startList = todoItems[source.droppableId];
        const finishList = todoItems[destination.droppableId];

        // Movendo dentro da mesma lista
        if (startList === finishList) {
            const newList = Array.from(startList);
            newList.splice(source.index, 1);
            newList.splice(destination.index, 0, draggableId);

            const newTodoItems = {
                ...todoItems,
                [source.droppableId]: newList
            };

            setTodoItems(newTodoItems);
            
            await api.updateTodoList(source.droppableId, {title: startList.title, items: newList.map(item => item.id)});
        } else {
            // Movendo de uma lista para outra
            const startListItems = Array.from(startList);
            const finishListItems = Array.from(finishList);
            const movedItem = startListItems[source.index];

            startListItems.splice(source.index, 1);
            finishListItems.splice(destination.index, 0, movedItem);

            const newTodoItems = {
                ...todoItems,
                [source.droppableId]: startListItems,
                [destination.droppableId]: finishListItems
            };

            setTodoItems(newTodoItems);

            await api.updateTodoList(source.droppableId, {title: startList.title, items: startListItems.map(item => item.id)});
            await api.updateTodoList(destination.droppableId, {title: startList.title, items: finishListItems.map(item => item.id)});
        }
    };

    return (
        <div className='bg-primary-400 w-full h-full min-h-screen flex flex-col'>
            <Header></Header>
            <div className='w-full h-full flex flex-col md:flex-row'>
                {
                    userId ?
                        (<DragDropContext
                            onDragEnd={onDragEnd}
                        >
                            {
                                todoLists.map((column) => {
                                    const tasks = todoItems[column._id];
                                    console.log(tasks)
                                    if (tasks) {
                                        return <TodoList key={column._id} column={column} tasks={tasks} />
                                    } else {
                                        return <div></div>
                                    }
                                })
                            }
                            <div className='m-2 text-2xl border-2 border-quaternary-400 rounded-sm sm:min-w-64 hover:bg-secondary-200 bg-tertiary-200 transition-all hover:cursor-pointer hover:rounded-2xl flex items-center justify-center text-center font-bold pt-1'>
                                +
                            </div>
                        </DragDropContext>)
                        :
                        (
                            <div className='w-full h-full min-h-screen flex items-center justify-center flex-col'>
                                <div className='text-text-50 font-bold text-3xl mb-4'>Faça login para visualizar suas listas</div>
                                <a href="/" className='mt-6 py-4 px-8 hover:cursor-pointer text-xl bg-secondary-400 text-quaternary-400 rounded-3xl transition-all hover:rounded-xl hover:bg-secondary-200'>Login</a>
                            </div>
                        )
                }
            </div>

        </div>
    )
}

export default Home;


