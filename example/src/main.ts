import { createApp } from 'vue'
import App from './App.vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/atom-one-dark.css'

hljs.registerLanguage('javascript', javascript)

const app = createApp(App)
app.use(hljsVuePlugin)
app.mount('#app')