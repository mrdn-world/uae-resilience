import { createApp } from 'vue'
import App from './App.vue'
import { t } from './i18n'
import './styles/global.scss'

document.title = t('meta.title')
const descMeta = document.querySelector('meta[name="description"]')
if (descMeta) descMeta.setAttribute('content', t('meta.description'))

createApp(App).mount('#app')
