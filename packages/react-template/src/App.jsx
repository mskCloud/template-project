import { Suspense, useState } from 'react'
import { Outlet } from 'react-router'
import { useCommonStore } from './stores'

const App = () => {
    const [title] = useState('React')
    const { bears } = useCommonStore()

    return (
        <>
            <div>
                <header>{title}</header>
                <main>
                    {bears}
                    <Suspense fallback={() => <div>Loading...</div>}>
                        <Outlet></Outlet>
                    </Suspense>
                </main>
            </div>
        </>
    )
}

export default App
