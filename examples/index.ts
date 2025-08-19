import LazyLoad from '@rui/add-ons/directives/lazy'
import { vTitle } from '@rui/core/directives/title'
import { createApp } from 'vue'
import App from './App.vue'

import './styles/tailwind.css'
import './styles/index.css'

const app = createApp(App)

app.use(LazyLoad)
app.directive('title', vTitle)

app.mount('#root')
