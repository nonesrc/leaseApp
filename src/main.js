import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'

// CSS
import './assets/styles/index.scss'

const APP = createApp(App)
APP.use(router)
APP.mount('#app')
a
