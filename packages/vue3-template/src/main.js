import 'dayjs/locale/zh-cn'
import 'virtual:uno.css'
import 'vfonts/Lato.css'
import '@/assets/styles/index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import stores from './stores'

const initApp = () => {
    const app = createApp(App)
    app.use(stores)
    app.use(router)
    app.mount('#app')
}

initApp()
