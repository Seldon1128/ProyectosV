import { useState } from "react"
import { useCookies } from "react-cookie"

export function Header(props){
    const {todos} = props
    const todosLength = todos.length
    const isTasksPlural = todos.length != 1
    const taskOrTasks = isTasksPlural ? 'tasks' : 'task'
    const [cookies, setCookie, removeCookie] = useCookies(null)

    const signOut = () => {
        console.log('signout')
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
    }

    return(
        <div className="list-header">
            <h1 className="text-gradient">You have {todosLength} open {taskOrTasks}.</h1>
            <div className="button-container">
                <button className="signout" onClick={signOut}>SIGN OUT</button>
            </div>
        </div>
    )
}