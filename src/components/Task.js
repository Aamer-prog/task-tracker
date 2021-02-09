import { FaTimes } from 'react-icons/fa'

const Task = ({ theTask, onDelete, onToggle }) => {

  return (
    <div className={`task ${theTask.reminder ? 'reminder' : ''}`}  onDoubleClick={() => onToggle(theTask.id)}>
      <h3>
        {theTask.text}  <FaTimes style={{ color:'red', cursor:'pointer' }} onClick={() => onDelete(theTask.id)}/>
      </h3>
      <p>{theTask.day}</p>
    </div>
  )
}

export default Task
