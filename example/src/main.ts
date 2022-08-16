import { createApp } from 'vue'
import App from './App.vue'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/atom-one-dark.css'

hljs.registerLanguage('typescript', typescript)

const app = createApp(App)
app.use(hljsVuePlugin)
app.mount('#app')