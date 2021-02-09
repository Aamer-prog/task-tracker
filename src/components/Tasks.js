import Task from './Task'

const Tasks = ({ theTasks, onDelete, onToggle }) => {
  return (
    <>
      {theTasks.map((task) => ( 
      <Task key={task.id} theTask={task} onDelete={onDelete} onToggle={onToggle}/> 
      ))}
    </>
  )
}

export default Tasks
