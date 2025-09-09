import { createBrowserRouter } from 'react-router'
import { lazy } from 'react'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: lazy(() => import('@/App')),
        children: [{ path: '/home', Component: lazy(() => import('@/pages/home/index')) }],
    },
    {
        path: '/about',
        Component: lazy(() => import('@/pages/about/index')),
    },
])
