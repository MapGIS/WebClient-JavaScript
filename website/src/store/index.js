import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import demo from './modules/demo'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    demo
  }
})

export default store