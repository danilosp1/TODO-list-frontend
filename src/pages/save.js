
const novaData = [
    {
        _id: 'column-1', 
        title: 'To do',
        items: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    {
        _id: 'column-2', 
        title: 'Nova lista',
        items: []
    },
]

const novaTask = [
    {
        _id: 'task-1',
        content: 'Tirar o lixo',
        completed: false
    },
    {
        _id: 'task-2',
        content: 'Tirar o lixo',
        completed: false
    },
    {
        _id: 'task-3',
        content: 'Tirar o lixo',
        completed: false
    },
    {
        _id: 'task-4',
        content: 'Tirar o lixo',
        completed: false
    }
]


// const { destination, source, draggableId } = result;

// // Se não há destino, não faz nada
// if (!destination) {
//     return;
// }

// // Se o local do destino é o mesmo do início, não faz nada
// if (
//     destination.droppableId === source.droppableId &&
//     destination.index === source.index
// ) {
//     return;
// }

// const start = data.columns[source.droppableId];
// const finish = data.columns[destination.droppableId];

// if (start === finish) {
//     const newTaskIds = Array.from(start.tasksIds);
//     newTaskIds.splice(source.index, 1);
//     newTaskIds.splice(destination.index, 0, draggableId);

//     const newColumn = {
//         ...start,
//         tasksIds: newTaskIds,
//     };

//     const newData = {
//         ...data,
//         columns: {
//             ...data.columns,
//             [newColumn.id]: newColumn,
//         },
//     };

//     setData(newData);
// }
// else {
//     const newTaskIds = Array.from(start.tasksIds);
//     const destinationTasksIds = Array.from(finish.tasksIds)
//     newTaskIds.splice(source.index, 1);
//     destinationTasksIds.splice(destination.index, 0, draggableId);

//     const startColumn = {
//         ...start,
//         tasksIds: newTaskIds,
//     };

//     const finishColumn = {
//         ...finish,
//         tasksIds: destinationTasksIds,
//     };

//     const newData = {
//         ...data,
//         columns: {
//             ...data.columns,
//             [startColumn.id]: startColumn,
//             [finishColumn.id]: finishColumn
//         },
//     };

//     setData(newData);
// }