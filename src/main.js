import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
import { formatAddress, formatNumber,formateTime,orderStatus} from './utils/filter'



// import fitler from './utils/filter'
// import VueCookies from 'vue-cookies'


const app = createApp(App)
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key])
})

app.use(router)
app.use(store)
// app.use(VueCookies)

app.config.productionTip = false
app.use(ElementPlus);
app.config.globalProperties.$filters = {
  formatNumber,
  formatAddress,
  formateTime,
  orderStatus
}

app.mount('#app')

