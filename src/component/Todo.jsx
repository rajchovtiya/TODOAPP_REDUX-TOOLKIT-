import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux';
import { addTask, EditTask, removeTask } from '../Store';

const Todo = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm();

    const [editId, setEditId] = useState(null);
    const task = useSelector((state) => state.reducerStore.task);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        if (editId !== null) {
            dispatch(EditTask({ id: editId, newTitle: data.text }));
            setEditId(null);
        } else {
            dispatch(addTask({ id: Date.now(), title: data.text }));
        }
        reset();
    };

    const editTask = (index) => {
        const taskToEdit = task[index];
        setValue('text', taskToEdit.title);
        setEditId(taskToEdit.id);
    };

    return (
        <div className='w-full h-screen flex items-center justify-center bg-[#f0f0f0]'>
            <div className='max-w-[600px] w-full bg-white shadow-md rounded-lg p-6'>
                <h1 className='text-2xl font-bold text-center mb-4'>Todo List</h1>
                <form className='mb-4' onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Add or edit a todo"
                        className='w-full p-2 border border-gray-300 rounded'
                        {...register("text", { required: true, maxLength: 100 })}
                    />
                    <button
                        type="submit"
                        className='mt-2 w-full bg-[#9800eb] text-white p-2 rounded hover:bg-[#7a00c9]'
                    >
                        {editId !== null ? "Update Task" : "Add Todo"}
                    </button>
                </form>

                <ul className='list-none p-0 m-0'>
                    {task.length === 0 ? (
                        <p className='text-center text-gray-500'>No tasks available</p>
                    ) : (
                        task.map((item, index) => (
                            <li key={item.id || index} className='flex items-center justify-between p-2 rounded mb-2'>
                                <p>{item.title}</p>
                                <div className='flex items-center gap-3'>
                                    <CiEdit
                                        className='text-blue-500 text-2xl cursor-pointer'
                                        onClick={() => editTask(index)}
                                    />
                                    <MdDelete
                                        className='text-red-500 text-2xl cursor-pointer'
                                        onClick={() => dispatch(removeTask({ id: item.id }))}
                                    />
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Todo;
