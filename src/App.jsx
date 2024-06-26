import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItem } from './components'

function App() {

const [todos , setTodos] = useState([])
// Now we have to set all the functionalities of these providers
const addTodo = (todo) => {
      // setTodos(todo) agar hum aisa krdenge to akela yhi pass hoga baaki sb erase ho jaenge from the todo list
      // Thats why we use a different approach here.
      setTodos  ((prev) => [{id:Date.now(), ...todo}, ...prev])
    
    }
    const updateTodo = (id , todo) => {
      setTodos((prev) => prev.map((prevTodo) => (prevTodo.id
        === id ? todo : prevTodo )))
// isme humne array lagadia jo previous todo ko change krega of id match hogyi current wali jo abhi pass hui h 
// and if nhi hui equal to prev wali hi rehne do       
// prev se previous wali array mili uske baad hume uski prevTodo.id se id mili   

// hume ab aisa prev bnaana h delete m ki prev ki id na ho,is trah se new array baaki sbki honi chaiye
//Thats why we will use here filter
}


    const deleteTodo = (id) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id)) //Todo wali id match nhi krni chaiye humari id se 
    }

    const toggleComplete = (id) => {
      setTodos((prev) =>
         prev.map((prevTodo) =>
           prevTodo.id === id ? {...prevTodo,
            completed: !prevTodo.completed} : prevTodo)) // Ab hume actualy m match krna h to bs whi change ho saari change na ho
    }// If true, it creates a new object with the same properties as prevTodo but updates the completed property.
//prevTodo.id === id: Checks if the id of the current todo (prevTodo) matches the id we want to update.
//{...prevTodo, completed}: The spread operator (...) is used to copy all properties of prevTodo, then the completed property is updated or added.
 

//BS YHI TK THA BASIC CONTEXT KI FUNCTIONALITY AB AAGE ISKE LOCAL STORAGE KI FUNCTIONALITY H
useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos"))
  if(todos && todos.length > 0)  // ye dekhne k lie ki khi wo empty to nhi h
    {
      setTodos(todos)
    }

}, [])

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))   //This is the function that useEffect will run whenever todos changes.
},[todos])
//localStorage.setItem: This method stores data in the browser's local storage. It takes two arguments: a key ("todos") and a value (the stringified todos array).

//browser side pr directly we can access the local storage
//Whenever the todos state changes, the useEffect hook runs the function to update the todos in localStorage. This ensures that the latest state of todos is saved in localStorage, so it can be persisted across page reloads
return (
    <TodoProvider value ={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key = {todo.id}
                         className = 'w-full'
                          >
                          <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>

       </TodoProvider>

  )
}

export default App
