import { createRouter, createWebHashHistory } from 'vue-router'

const metaMap = {
    Home: { label: '首页' },
    About: { label: '关于' },
    Email: { label: '邮件' },
}

const autoImportPage = () => {
    const parsePagePath = (path = [], route = {}, component) => {
        const cur = path.shift()
        if (!cur || cur.endsWith('.p.vue')) {
            route.component = component
            return route
        }

        if (cur === 'children') {
            const child = parsePagePath(path, {}, component)
            route.children = [child]
            return route
        }

        route.path = cur
        route.name = `${cur[0].toUpperCase()}${cur.slice(1)}`
        route.meta = metaMap[route.name] || {}
        return parsePagePath(path, route, component)
    }

    const mergeRoute = (routes, route) => {
        if (!routes) {
            return
        }
        const cur = routes.find((f) => f.name === route.name)
        if (!cur) {
            routes.push(route)
            return
        }
        Object.assign(cur, { ...cur, ...route, children: cur?.children })
        if (route.children) {
            mergeRoute(cur.children, route.children[0])
        }
    }

    const modules = import.meta.glob('../pages/**/*.p.vue', { import: 'default' })
    const routePages = []
    const pageList = []

    for (const key in modules) {
        const component = modules[key]
        const pagePath = key.replace('../pages/', '').split('/')
        pageList.push(parsePagePath(pagePath, {}, component))
    }

    for (const item of pageList) {
        mergeRoute(routePages, item)
    }

    for (const item of routePages) {
        item.path = `/${item.path}`
    }

    return routePages
}

export const routePages = [
    ...autoImportPage(),
    {
        path: '/',
        redirect: {
            name: 'Home',
        },
    },
]

const routes = [
    ...routePages,
    {
        path: '/404',
        name: '404',
        component: () => import('@/pages/errors/404.p.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

router.beforeEach(async (to, from, next) => {
    next()
})

export default router
