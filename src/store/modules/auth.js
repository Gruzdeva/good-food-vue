import api from '@/api/api'


export default {
  getters: {
    isAuthenticated(state) {
      return state.user._id !== undefined
    },
    currentUser(state) {
      return state.user
    }
  },
  state: {
    user: {}
  },
  actions: {
    async register(ctx, registerData) {
      try {
        const response = await api.register(registerData)
        return response
      } catch (e) {
        return {error: e.message}
      }
    },
    async login(ctx, loginData) {
      try {
        const response = await api.login(loginData)
        if (response.user) {
          ctx.commit('setUser', response.user)
        }

        return response
      } catch (e) {
        return {error: e.message}
      }
    },
    async logout(ctx) {
      ctx.commit('setUser', {})
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  }
}
