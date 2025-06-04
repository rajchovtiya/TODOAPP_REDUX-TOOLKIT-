import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const data = await response.json();
    return data.map(item => ({ id: item.id, title: item.title }));
});

const initialState = {
    task: [],
};

const reducerStore = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask(state, action) {
            state.task.push(action.payload);
        },
        removeTask(state, action) {
            state.task = state.task.filter((task) => task.id !== action.payload.id);
        },
        EditTask(state, action) {
            const { id, newTitle } = action.payload;
            const taskToUpdate = state.task.find((task) => task.id === id);
            if (taskToUpdate) {
                taskToUpdate.title = newTitle;
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.task = action.payload;
            })
    }

});

export const { addTask, removeTask, EditTask } = reducerStore.actions;

export const store = configureStore({
    reducer: {
        reducerStore: reducerStore.reducer
    },
});


// store.dispatch(addTask({ title: 'Task 1' }));
// store.dispatch(addTask({ title: 'Task 2' }));
// store.dispatch(removeTask({ id: 0 }));
// store.dispatch(EditTask({ id: 1, newTitle: "Updated Task 2" }));
// console.log(store.getState());
