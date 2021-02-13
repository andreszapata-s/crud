import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import shortid from 'shortid'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])



  const addTask = (e) => {
    e.preventDefault() //Para que no nos recargue la pagina  con el submit
    
    if(isEmpty(task)){
      console.log("Task is empty")
      return
    }

    const newTask = {
      id: shortid.generate(), // shortid tiene distintos metodos, en este caso usamos generate que crea id unicos que no se repiten
      name: task //: task  ->// Esto significado que vamos a tener una tarea de tipo task que ya creamos, pero la nueva sintaxis deja declarar solo con el nombre 
    }
    

    setTasks([ ...tasks, newTask]) //Hay que usar spread operator para que apile las tareas y no deje siempre la ultima con new tasks
    setTask("")
  } 
  
  
  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
           <ul className="list-group">
            {
              tasks.map((task) => ( 

                <li className="list-group-item" key={task.id}>
                <span className="lead">{task.name}</span>
                <button className="btn btn-danger btn-sm float-right mx-2">Eliminar</button>
                <button className="btn btn-warning btn-sm float-right">Editar</button>
                </li>
              
              ))
            }
           </ul>
           
        </div>
        <div className="col-4">
        <h4 className="text-center">Formulario</h4>
         <form onSubmit={addTask}>
           <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea"
              onChange={(text) => setTask(text.target.value)}
              value={task}
           />
           <button 
              className="btn btn-dark btn-block"
              type="submit"
           >
              Agregar
           </button>
         </form>
        </div>
      </div>
    </div>
  )
}

export default App
