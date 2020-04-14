import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
      state.user = null
    }
  },
  actions: {
    signup ({commit, dispatch}, authData) {
      axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API KEY]', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('email', res.data.email)
          dispatch('storeUser', authData)
          router.push('/dashboard')
        })
        .catch(error => alert(error.message))
    },
     postData ({state}, surveyData) {
      if (!state.idToken) {
        return
      }
      axios.post('https://vue-journal.firebaseio.com/survey.json' + '?auth=' + state.idToken , surveyData)
        .then(res => {
         console.log(res)
        })
        alert("Done")
        .catch(error => console.log(error))
    },
    login ({commit}, authData) {
      axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API KEY]', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('email', res.data.email)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })

          router.push('/dashboard')
        })
        .catch(error => alert(error.message))
    },
    tryAutoLogin ({commit}) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
      router.push('/dashboard')
    },
    logout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/signin')
    },
    storeUser ({ state}, userData) {
      if (!state.idToken) {
        return
      }
      axios.post('https://vue-journal.firebaseio.com/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    fetchUser ({ commit, state}) {
      if (!state.idToken) {
        return
      }
      const email = localStorage.getItem('email')
      axios.get('https://vue-journal.firebaseio.com/users.json?orderBy="email"&equalTo="' + email + '"')
        .then(res => {
          console.log(res)
        
         // const users = [] 
          console.log(res.data)
          const data = res.data
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
            console.log(users)
          }
         commit('storeUser', users[0])
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    user (state) {
       return state.user
    },
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
})