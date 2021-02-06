import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([
  {
    id: 1,
    text: 'Go to the dentist',
    day: 'Feb 7th at 9:00am',
    reminder:  true,
  },
  {
    id: 2,
    text: 'Fix the lamps',
    day: 'Feb 8th at 8:00pm',
    reminder:  false,
  },
  {
    id: 3,
    text: 'DO the Website',
    day: 'Feb 21th at 2:00pm',
    reminder:  true,
  },
])

 // Add task 
 const addTask = (task) => {
   const id = Math.floor(Math.random() * 10000) + 1
   const newTask = { id, ...task }
   setTasks([...tasks, newTask])
 }

 // Delete the task 
 const deleteTask = (id) => {
   setTasks(tasks.filter((task) => task.id !== id))
 }

 // Toggle reminder 
 const toggleReminder = (id) => {
   setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder} : task))
 }

 // Showing the tasks
  return (
    <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks to show!'}
    </div>
  );
}

export default App;
