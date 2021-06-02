import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.css'
import './styles/global.css'
import ElementUI from 'element-ui';
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.less';

import IconFont from './components/IconFont/iconfont'
import VueLazyload from 'vue-lazyload'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
Vue.component('v-chart', ECharts)

Vue.use(ElementUI);
// Vue.use(Antd);
Vue.use(VueLazyload);

Vue.component('IconFont', IconFont)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
