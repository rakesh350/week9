import { useEffect, useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [render, setRender] = useState(true)

  useEffect(()=> {
    setTimeout(()=>{
      setRender(false)
    }, 10000) 
  }, [])

  return (
    <>
      {render ? <MyComponent /> : <div></div>}
    </>
  )
}

// Lifecycle event
// function MyComponent() {
//   useEffect(() => {
//     console.log('Component mounted')
//     return () => {
//       console.log('Component unmounted')
//     }
//   }, [])

//   return <div>
//     From inside my component
//   </div>
// }

class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  componentDidMount() {
    console.log('Component mounted')
  }

  componentWillUnmount() {
    console.log('Component will unmount')
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    )
  }
}

// function MyComponent(){
//   const [count, setCount] = useState(0)

//   const incrementCount = () => {
//     setCount(count + 1)
//   }

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={incrementCount}>Increment</button>
//     </div>
//   )
// }

export default App
