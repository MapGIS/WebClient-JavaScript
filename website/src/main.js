import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.css'
import './styles/global.css'
import ElementUI from 'element-ui';

import IconFont from './components/IconFont/iconfont'
import VueLazyload from 'vue-lazyload'

Vue.use(ElementUI);
Vue.use(VueLazyload);

Vue.component('IconFont', IconFont)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
