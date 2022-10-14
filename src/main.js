import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import 'primeicons/primeicons.css'
import './style.scss'

createApp(App)
  .use(store)
  .mount('#app')
