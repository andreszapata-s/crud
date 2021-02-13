import { isEmpty, size } from 'lodash'
import React, { useState } from 'react'
import shortid from 'shortid'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error,setError] = useState(null)
  
  const validForm =  () => {
    let isValid = true
    setError(null)

    if(isEmpty(task)){
      setError("Debes ingresar una tarea")
      isValid = false
    }

    return isValid
  }


  const addTask = (e) => {
    e.preventDefault() //Para que no nos recargue la pagina  con el submit
    
    if(!validForm()) {
      return 
    }

    const newTask = {
      id: shortid.generate(), // shortid tiene distintos metodos, en este caso usamos generate que crea id unicos que no se repiten
      name: task //: task  ->// Esto significado que vamos a tener una tarea de tipo task que ya creamos, pero la nueva sintaxis deja declarar solo con el nombre 
    }
    

    setTasks([ ...tasks, newTask]) //Hay que usar spread operator para que apile las tareas y no deje siempre la ultima con new tasks
    setTask("")
  } 
   
    const deleteTask = (id) => {
      const filteredTask = tasks.filter(task => task.id !== id)
      setTasks(filteredTask)
    } 

    const editTask = (theTask) => {
      setTask(theTask.name)
      setEditMode(true)
      setId(theTask.id)
    } 

    const saveTask = (e) => {
      e.preventDefault()
      
      if(!validForm()) {
        return 
      }

      const editedTasks = tasks.map(item => item.id === id ? {id, name: task} :item)
      setTasks(editedTasks)
      setEditMode(false)
      setTask("")
      setId("")
    } 

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4> 
          { 

            size(tasks) === 0 ? (
              <li className="list-group-item">Aun no hay tareas asignadas.</li>
            ) : (
              <ul className="list-group">
              {
                tasks.map((task) => ( 
  
                  <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <button 
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={ () => deleteTask(task.id) }
                    >
                    Eliminar
                  </button>
                  <button
                   className="btn btn-warning btn-sm float-right"
                   onClick={ () => editTask(task) }
                   >
                     Editar
                  </button>
                  </li>
                
                ))
              }
             </ul>
            )

          }
        </div>
        <div className="col-4">
        <h4 className="text-center">
          {editMode ? "Modificar tarea" : "Agregar tarea"}
        </h4>
           {
             error && <span className="text-danger"> {error}</span>
           }
         <form onSubmit={editMode ? saveTask : addTask}>
           <input
              type="text"
              className="form-control mb-2"
              placeholder={"Ingrese la tarea"}
              onChange={(text) => setTask(text.target.value)}
              value={task}
           />
           <button 
              className={editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"}
              type="submit"
           >
              {editMode ? "Guardar" : "Agregar"}
           </button>
         </form>
        </div>
      </div>
    </div>
  )
}

export default App
