import React from 'react';
import Item from './Item';
import Swal from 'sweetalert2'
import './style.css';



function App() {
  
 

const [todos, setTodos] = React.useState(() => {
  if(localStorage.getItem("todos")) {
    return JSON.parse(localStorage.getItem("todos"))
  }
  else {
    return []
  }
})
const [newItem, setNewItem] = React.useState("")

React.useEffect(() => {
  if(localStorage.getItem("todos") === null) {
    Swal.fire({
      title:`Welcome to GLtodo App🗒️`,
      text: "Never Forget Anything Again📝",
      icon: "success",
      timer: 2000,
      showConfirmButton:false,
      timerProgressBar: true
      })
  }
  else {
    Swal.fire({
      title:`Welcome Back to GLtodo App🗒️`,
      text: "Continue Writing Your Todos📝",
      icon: "success",
      timer: 2000,
      showConfirmButton:false,
      timerProgressBar: true
      })
  }
 
},[0])

React.useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
  
},[todos])

function addtask() {

  if(newItem === "") {
    Swal.fire({
      title:`Oh...no😲💔`,
      text: "Why didn't you add a task?🥺",
      icon: "error",
      timer: 2000,
      showConfirmButton:false,
      timerProgressBar: true
      })
  }
  else {
    Swal.fire({
      title:`New Task Added🎉🎉`,
      text: "We can't wait for you to complete it😄",
      icon: "success",
      timer: 2000,
      showConfirmButton:false,
      timerProgressBar: true
      })
      setTodos(prev => [
        ...prev,
        {
          id:crypto.randomUUID(),
          task:newItem,
          completed:false
        }
      ])  
      setNewItem("")
  }

}

console.log(todos)

function ticktask(id,event) {
  if (event.target.tagName === "LI") {
    setTodos(prev => {
      return prev.map(todo => todo.id === id? {...todo, completed:!todo.completed} : todo)
    })
  }
  else if (event.target.tagName === "SPAN") {
    Swal.fire({
      title:`Are you sure?`,
      text: "You are about to delete a task.",
      icon: "question",
      showCancelButton:true,
      confirmButtonText:'Yes',
      timerProgressBar: true
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            title:`Task Deleted🚮`,
            text: "We hope you completed it.😄",
            icon: "success",
            showConfirmButton:false,
            timer:2000,
            timerProgressBar: true
            })
            setTodos(prev => {
              return prev.filter(todo => todo.id !== id)
            })
        }
        else {
          return
        }
        
      })
    
  }
}

  return (
    <div className="container">
        <div className="todo-app">
        <h2>GLtodo App</h2>
            <div className="row">
                <input type="text" id="input-box" placeholder="I Want Todo..." value={newItem} onChange={e => setNewItem(e.target.value)}/>
                <button onClick={addtask}>Add</button>
            </div>
            <ul className="list-container" onClick={ticktask}>
              {todos.map(todo => {
                return (
                  <Item 
                 { ...todo}
                  key = {todo.id}
                  ticktask = {(event) => {ticktask(todo.id,event)}}
                  
                /> 
                )
              })}
                
            </ul>
        </div>
    </div>
  )
}

export default App
