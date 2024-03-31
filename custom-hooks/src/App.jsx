import { useEffect, useState } from "react"
import axios from 'axios'

function App() {
    const [inputValue, setInputValue] = useState('')
    const debouncedValue = useDebounse(inputValue, 500)

    return (
        <div>
            Hello {debouncedValue} <br />
            <input type="text" value={inputValue} onChange={(e) => {
                setInputValue(e.target.value)
            }} placeholder="Search..." />
        </div>

    )

    // const { todos, loading } = useTodos(10)
    // const isOnline = useIsOnline()
    // const [count, setCount] = useState(0)

    // useInterval(() => {
    //     setCount(c => c + 1)
    // }, 2000)

    // return (<div> Time is {count}</div>)

    // if (isOnline) {
    //     return <div>Online...</div>
    // } else {
    //     return <div>Offline</div>
    // }

    // return (
    //     <>
    //         {todos.map(todo => <Track todo={todo} />)}
    //     </>
    // )
}

function useDebounse(inputValue, sec) {
    const [debouncedVal, setDebouncedVal] = useState('')
    useEffect(() => {
        const val = setTimeout(() => {
            setDebouncedVal(inputValue)
        }, sec)

        return () => {
            clearTimeout(val)
        }
    }, [inputValue])
    return debouncedVal
}

function useIsOnline() {
    const [isOnline, setIsOnline] = useState(window.navigator.onLine)

    useEffect(() => {
        window.addEventListener(('online'), () => {
            setIsOnline(true)
        })

        window.addEventListener('offline', () => {
            setIsOnline(false)
        })
    }, [])

    return isOnline
}

function useInterval(fn, timeout) {
    useEffect(() => {
        const val = setInterval(() => {
            fn()
        }, timeout)

        return () => {
            clearInterval(val)
        }
    }, [timeout])
}

function useTodos(n) {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const value = setInterval(() => {
            axios.get('https://sum-server.100xdevs.com/todos').then((response) => {
                setTimeout(() => {
                    setTodos(response.data.todos)
                    setLoading(false)
                }, 1000)
            })
        }, n * 1000)

        axios.get('https://sum-server.100xdevs.com/todos').then((response) => {
            setTimeout(() => {
                setTodos(response.data.todos)
                setLoading(false)
            }, 1000)
        })

        return () => {
            clearInterval(value)
        }

    }, [n])

    return { todos, loading }
}

function Track({ todo }) {
    return <div>
        {todo.title}
        <br />
        {todo.description}
    </div>
}

export default App