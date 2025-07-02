import {TodoCard} from "./TodoCard"
export function TodoList(props){
    const {todos, selectedTab} = props

    const filterTodosList = selectedTab === 'All' ? 
        todos :
        selectedTab === 'Complete' ?
            todos.filter(val => val.completed) :
            todos.filter(val => !val.completed)


    return(
        <>  
            {filterTodosList.length === 0 && <div style={{ marginBottom: '1rem' }} />}
            {filterTodosList.map((todo, todoIndex) => {
                return(
                    <TodoCard 
                        key={todoIndex} 
                        todoIndex={todos.findIndex(val => val.input == todo.input)}
                        {...props}
                        todo={todo}/>
                )
            })}

        </>
    )
}