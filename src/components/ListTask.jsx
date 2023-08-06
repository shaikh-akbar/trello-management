import React, { useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { toast } from 'react-hot-toast';

function ListTask({ tasks, setTasks }) {
    const [todos, setTodos] = useState([]);
    const [InProgress, setInProgress] = useState([])
    const [closed, setClosed] = useState([])

    useEffect(() => {
        const fTodos = tasks.filter((task) => task.status === "todo")
        const fInProgress = tasks.filter((task) => task.status === "Inprogress")
        const fClosed = tasks.filter((task) => task.status === "closed")

        setTodos(fTodos)
        setInProgress(fInProgress)
        setClosed(fClosed)
    }, [tasks])
    const statuses = ['todo', 'inprogress', 'closed']
    return (
        <div className='flex gap-16'>
            {statuses.map((status, index) => (
                <Section key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} InProgress={InProgress} closed={closed} />
            ))}
        </div>
    )
}

export default ListTask


const Section = ({ status, tasks, setTasks, todos, InProgress, closed }) => {

    const [{isOver},drop] = useDrop(()=>({
        accept:"task",
        drop :(item) => addItemToSection(item.id),
        collect:(monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    let text = "TODO"
    let bg = "bg-slate-500"
    let taskToMap = todos

    if (status === "inprogress") {
        text = "In Progress"
        bg = "bg-yellow-500"
        taskToMap = InProgress
    }
    if (status === "closed") {
        text = "closed"
        bg = "bg-green-500"
        taskToMap = closed
    }
    const addItemToSection = (id) => {
       setTasks((prev)=>{
        const mTask = prev.map((t)=>{
            if(t.id === id){
                return {...t,status:status}
            }
            return t
        })
        localStorage.setItem("tasks",JSON.stringify(mTask))
        toast("Status Changed")
        return mTask;
       })
   
    }
    return (
        <div className={`w-64 rounded-nd p-2 ${isOver ? "bg-slate-200":""}`} ref={drop}>
            <Header text={text} bg={bg} count={taskToMap.length} />
            {
                taskToMap.length>0 && taskToMap.map((task) => (
                    <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
                ))
            }
        </div>
    )
}

const Header = ({ text, bg, count }) => {
    return (
        <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text}
            <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'>
                {count}
            </div>
        </div>
    )
}

const Task = ({ task, tasks, setTasks }) => {

    const [{ isDragging },drag] = useDrag(()=>({
        type:"task",
        item:{id:task.id},
        collect:(monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    console.log(isDragging)
    const handleRemove = (id) => {
        const fTask = tasks.filter((t)=>t.id!==id)
        localStorage.setItem("tasks",JSON.stringify(fTask))
        setTasks(fTask)
        toast("Task Removed")
    }
    return (
        <div ref={drag} className={`relative p-4 mt-8 shadow-md rounded-md flex justify-between ${isDragging ? "opacity-25":"opacity-100"}`}>
            <p>{task.name}</p>
           <button className='absoloute bottom-1 right-1 text-slate-400' onClick={()=>handleRemove(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    )
}