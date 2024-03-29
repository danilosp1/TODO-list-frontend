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
    const [modal, setModal] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const userId = localStorage.getItem('authId')

    // Hook para receber as listas e itens do usuário a partir da API
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

    // Hook para atualizar as informações das Lists de forma periódica no BD
    useEffect(() => {
        const updateData = async () => {
            try {
                for (const key of Object.keys(todoItems)) {
                    const item = todoLists.find((value) => value._id === key);

                    await api.updateTodoList(key, { title: item.title, items: todoItems[key].map(value => value._id) });
                }

            } catch (error) {
                console.error("Erro ao atualizar dados:", error);
            }
        }

        updateData();
    }, [todoItems, todoLists])

    // Handlers para criação e remoção de Itens dos hooks
    const handleCreateTask = (listId, task) => {
        setTodoItems(prevState => {
            const newList = { ...prevState };
            newList[listId].push(task);
            return newList;
        })
    }

    const handleDeleteTask = async (taskId) => {
        let taskAtual;
        for (const key of Object.keys(todoItems)) {
            if(todoItems[key].find(value => taskId === value._id)){
                taskAtual = todoItems[key].find(value => taskId === value._id);
            }
        }

        setTodoItems(prevState => {
            const newList = { ...prevState };

            newList[taskAtual.list] = newList[taskAtual.list].filter(task => task._id !== taskId);
            return newList;
        });
    };

    // Handler para atualizar o state dos itens (completed)
    const handleChangeCompleted = (listId, task) => {
        setTodoItems(prevState => {
            const newList = { ...prevState };
            newList[listId] = newList[listId].filter(value => value._id !== task._id);
            newList[listId].push(task);
            return newList;
        });
    }

    // Handlers para criação e remoção de Lists dos hooks
    const handleCreateList = async (e) => {
        e.preventDefault()
        try {
            const newList = await api.createTodoList({title: inputValue, userId: userId});
            setTodoLists(prevTodoLists => [...prevTodoLists, newList]);
            setTodoItems(prevTodoItems => {
                const newItems = { ...prevTodoItems };
                newItems[newList._id] = [];
                return newItems
            })
        } catch (error) {
            console.error("Erro ao criar lista:", error)
        }

        setInputValue("");
        handleCloseModal();
    }

    const handleDeleteList = (listRemoved) => {
        setTodoLists(prevState => {
            const newList = [ ...prevState ];
            const index = newList.findIndex((item) => item._id === listRemoved._id)
            newList.splice(index, 1);
            return newList;
        })
    }

    // Handlers para controle de modal
    const handleOpenModal = () => {
        setModal(true);
    }

    const handleCloseModal = () => {
        setModal(false);
    }

    
    // Função que configura o drag and drop dos itens entre as listas
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
            const newList = todoItems[source.droppableId];
            const changedItem = newList.splice(source.index, 1);
            newList.splice(destination.index, 0, changedItem[0]);

            const newTodoItems = {
                ...todoItems,
                [source.droppableId]: newList
            };

            setTodoItems(newTodoItems);

            try {
                await api.updateTodoListOrder(source.droppableId, newList.map(item => item._id));
            } catch (error) {
                console.error("Erro ao atualizar a ordem dos itens na lista:", error);
            }

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

            try {
                const newItem = await api.updateTodoitem(movedItem._id, { content: movedItem.content, completed: movedItem.completed, list: destination.droppableId });
                
                setTodoItems(prevState => {
                    const newList = { ...prevState };
                    const indexItem = newList[destination.droppableId].findIndex(value => value._id === newItem._id)
                    newList[destination.droppableId].splice(indexItem, 1, newItem)

                    return newList;
                })

            } catch (error) {
                console.error("Erro ao atualizar listas:", error);
            }
        }
    };

    return (
        <div className='bg-primary-400 w-[100%] h-full min-h-screen flex flex-col'>
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
                                    if (tasks) {
                                        return <TodoList key={column._id} column={column} tasks={tasks} onDeleteTask={handleDeleteTask} onCreateTask={handleCreateTask} onDeleteList={handleDeleteList} onChangeCompleted={handleChangeCompleted} />
                                    } else {
                                        return <div></div>
                                    }
                                })
                            }
                            <div className='m-2 text-2xl sm:min-w-64 font-bold relative'>
                                {
                                    modal ?
                                        (
                                            <form onSubmit={handleCreateList} className='min-h-52 absolute w-full h-full bg-secondary-200 border-2 z-10 border-quaternary-400 rounded-sm flex flex-col items-center'>
                                                <div className='m-2 text-quaternary-400 text-xl'>Adicionar lista</div>
                                                <div className='mb-2 text-quaternary-400 text-base'>título</div>

                                                <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} className='p-3 rounded-2xl focus:rounded-lg transition-all outline-none text-base' type="text" />

                                                <div className='mt-4 flex flex-row text-text-50 gap-4 text-base'>
                                                    <input type="submit" value="Adicionar" className='border-2 border-quaternary-400 bg-secondary-200 hover:bg-tertiary-200 transition-all hover:cursor-pointer hover:rounded-2xl p-2 mb-2 flex items-center justify-center text-center font-bold pt-1 w-full text-quaternary-400'></input>

                                                    <button onClick={handleCloseModal} className='border-2 border-quaternary-400 bg-delete-400 transition-all hover:cursor-pointer hover:rounded-2xl p-2 mb-2 flex items-center justify-center text-center font-bold pt-1 w-full text-text-50'>Cancelar</button>
                                                </div>
                                            </form>
                                        )
                                        :
                                        (
                                            <button onClick={handleOpenModal} className='min-h-52 flex items-center justify-center text-center w-full h-full border-2 border-quaternary-400 rounded-sm hover:bg-secondary-200 bg-tertiary-200 transition-all hover:cursor-pointer hover:rounded-2xl'>
                                                +
                                            </button>
                                        )
                                }
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


