import  {createContext, useContext} from "react"

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            tod: "Todo msg",
            complete: false,
        }
    ],
      addTodo: (todo) => {},
      updateTodo: (id, todo) => {},
      deleteTodo :(id) => {},
      ToggleComplete: (id) => {}

})



export const useTodo = () => {
    return useContext(TodoContext)
}


export const TodoProvider = TodoContext.Provider


//Todoprovider: This is a shorthand export for the Provider component of TodoContext. The Provider component is used to wrap parts of your application where you want the context to be accessible.