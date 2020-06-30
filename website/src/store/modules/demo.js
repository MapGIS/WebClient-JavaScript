const demo = {
  namespaced: true,
  state: {
    first: '',
    second: '',
    deep: 3,
    case: '',
    href: ''
  },
  getters: {
    first: state => {
      return state.first
    },
    second: state => {
      return state.second
    },
    deep: state => {
      return state.deep
    },
    case: state => {
      return state.case
    },
    href: state => {
      return state.href
    }
  },
  mutations: {
    TOGGLE_FIRST: (state, first) => {
      state.first = first
    },
    TOGGLE_SECOND: (state, second) => {
      state.second = second
    },
    TOGGLE_CASE: (state, showcase) => {
      state.case = showcase
    },
    TOGGLE_DEEP: (state, deep) => {
      state.deep = deep
    },
    TOGGLE_HREF: (state, href) => {
      state.href = href
    },
    TOGGLE_DEMO: (state, paypoad) => {
      state.first = paypoad.first
      state.second = paypoad.second
      state.case = paypoad.case
      state.deep = paypoad.deep
      state.href = paypoad.href
    },
  },
  actions: {
    ToggleFirst: ({ commit }, first) => {
      commit('TOGGLE_FIRST', first)
    },
    ToggleSecond: ({ commit }, second) => {
      commit('TOGGLE_SECOND', second)
    },
    ToggleCase: ({ commit }, showcase) => {
      commit('TOGGLE_CASE', showcase)
    },
    ToggleDeep: ({ commit }, showcase) => {
      commit('TOGGLE_DEEP', showcase)
    },
    ToggleHref: ({ commit }, href) => {
      commit('TOGGLE_HREF', href)
    },
    TOGGLE_DEMO: ({ commit }, payload) => {
      commit('TOGGLE_HREF', payload)
    },
  }
}

export default demo
