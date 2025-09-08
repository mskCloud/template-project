import { createBrowserRouter } from 'react-router'
import Home from '@/pages/home/index'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
])
