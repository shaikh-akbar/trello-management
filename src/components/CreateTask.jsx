import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import {v4 as uuidv4} from "uuid"
function CreateTask({tasks,setTasks}) {
    const [task,setTask] = useState({
        id:"",
        name:"",
        status:"todo"
    })
    console.log(task)
    const handleSubmit = (e) => {
        e.preventDefault();
        if(task.name.length<3) return toast.error("A task must have more than 3 charachter")
        if(task.name.length>100) return toast.error("A task must not be more than 100 charachter")
        setTasks((prev)=>{
            const list = [...prev,task]
            localStorage.setItem("tasks",JSON.stringify(list));
            return list;
        })
        toast.success('Task Created')
        setTask({
            id:"",
            name:"",
            status:"todo"
        })

    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='' className='border-2 border-slate-200 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1'
            value={task.name}
            onChange={(e)=>setTask({...task,id:uuidv4(),name:e.target.value})}
            />
            <button className='bg-cyan-500 rounded-md px-4 h-12 text-white'>Create</button>
        </form>
    </div>
  )
}

export default CreateTask