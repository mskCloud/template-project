import { useState } from 'react'
import './App.css'
import { Button } from 'antd'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className="text-red">{count}</div>
            <Button onClick={() => setCount(count + 1)}>Add</Button>
        </>
    )
}

export default App
