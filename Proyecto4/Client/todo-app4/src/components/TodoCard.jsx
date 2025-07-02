export function TodoCard(props){
    const{todo, handleDeleteTodo, todoIndex, handleCompleteTodo} = props

    return(
        <div className="card todo-item">
            <p>{todo.task}</p>
            <div className="todo-buttons">
                <button onClick={() => {
                    handleCompleteTodo(todo.id)
                }}disabled={todo.completed}>
                    <h6>Done</h6>
                </button>
                <button onClick={() => {
                    handleDeleteTodo(todo.id)
                }}>
                    <h6>Delete</h6>
                </button>
            </div>
        </div>
    )
}