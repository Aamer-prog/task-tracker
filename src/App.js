import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

// Fetch tasks 
const fetchTasks = async () => {
      const response = await fetch('http://localhost:5000/tasks')
      const data = await response.json()

      return data
    }

const fetchTask = async (id) => {
      const response = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await response.json()

      return data
    }

 // Add task 
 const addTask = async (task) => {
   const response = await fetch('http://localhost:5000/tasks', {
     method: 'POST',
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify(task)
   })

   const data = await response.json()

   setTasks([...tasks, data])


  //  const id = Math.floor(Math.random() * 10000) + 1
  //  const newTask = { id, ...task }
  //  setTasks([...tasks, newTask])
 }

 // Delete the task 
 const deleteTask = async (id) => {
   await fetch(`http://localhost:5000/tasks/${id}`, {
     method: 'DELETE',
   })

   setTasks(tasks.filter((task) => task.id !== id))
 }

 // Toggle reminder 
 const toggleReminder = async (id) => {

   const taskToToggle = await fetchTask(id)
   const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

   const response = await fetch(`http://localhost:5000/tasks/${id}`, {
     method:'PUT',
     headers: {
       'Content-type': 'application/json',
     },
     body: JSON.stringify(updTask),
   })

   const data = await response.json()

   setTasks(
     tasks.map((task) => 
     task.id === id ? { ...task, reminder: data.reminder} : task 
     )
  )
 }

 // Showing the tasks
  return (
  <Router>
    <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <Route path='/' exact render={(props) => (
          <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? <Tasks theTasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks to show!'}
          </>
        )}/>
        <Route path='/about'component={About} />
        <Footer />
    </div>
  </Router>
  );
}

export default App;
