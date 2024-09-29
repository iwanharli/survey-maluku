import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './registerServiceWorker'
import './axios.js'

// Library Components
import VueSweetalert2 from 'vue-sweetalert2'
import VueApexCharts from 'vue3-apexcharts'
import BootstrapVue3 from 'bootstrap-vue-3'
import CounterUp from 'vue3-autocounter'
import PrimeVue from 'primevue/config'
import Skeleton from 'primevue/skeleton'
import MultiSelect from "primevue/multiselect"
import 'aos/dist/aos.css'

// Custom Components & Directives
import "primevue/resources/primevue.min.css";
import globalComponent from './plugins/global-components'
import globalDirective from './plugins/global-directive'
import globalMixin from './plugins/global-mixin'

require('waypoints/lib/noframework.waypoints.min')

import StreamChat from 'stream-chat';


const app = createApp(App)
app.use(store).use(router)

// Library Components
app.use(VueSweetalert2)
app.use(VueApexCharts)
app.use(BootstrapVue3)
app.use(PrimeVue);
app.component('Skeleton', Skeleton);
app.component('counter-up', CounterUp)
app.component("MultiSelect", MultiSelect);

// Custom Components & Directives
app.use(globalComponent)
app.use(globalDirective)
app.mixin(globalMixin)

app.use(StreamChat)

app.mount('#app')

export default app
