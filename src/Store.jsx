import { configureStore, createSlice } from '@reduxjs/toolkit';

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
        }
    }
});

export const { addTask, removeTask, EditTask } = reducerStore.actions;

export const store = configureStore({
    reducer: {
        reducerStore: reducerStore.reducer
    }
});
