"use client";

import { useState } from 'react'

export default function TodoList() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);



    return (
        <div>
            <div>
                <input type="text" value={task} onChange={(e) => setTask(e.target.value)}
                    className='p-2 border'
                />
                <button onClick={() => setTodos(prev => [...prev, { id: crypto.randomUUID(), title: task }])}>add task</button>
            </div>
            <div>
                {todos?.map((todo) => (
                    <div key={todo.id}>
                        <p>{todo.title}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}
