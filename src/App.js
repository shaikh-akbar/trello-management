import React, { useEffect, useState } from 'react'
import CreateTask from './components/CreateTask'
import ListTask from './components/ListTask'
import { Toaster } from 'react-hot-toast'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const [tasks,setTasks] = useState([])
  console.log("tasks",tasks)
  useEffect(()=>{
    setTasks(JSON.parse(localStorage.getItem("tasks")))
  },[])
  return (
    <DndProvider backend={HTML5Backend}>
    <Toaster/>
    <div className='w-screen h-screen bg-slate-100 flex flex-col items-center pt-32 gap-16 '>
      <CreateTask tasks={tasks} setTasks={setTasks}/>
      <ListTask tasks={tasks} setTasks={setTasks}/>
    </div>
    </DndProvider>
 
  )
}

export default App