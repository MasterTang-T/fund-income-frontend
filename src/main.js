import {
    createApp
} from 'vue'
import Antd from 'ant-design-vue';
import Vant from 'vant';
import 'normalize.css'
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import router from './router'
import store from './store'
const app = createApp(App);

app.use(Antd).use(Vant).use(store).use(router).mount('#app')