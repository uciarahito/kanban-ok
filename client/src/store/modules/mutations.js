export const Mutations = {
  signIn: (state, payload) => {
    window.localStorage.setItem('token', payload.token)
    window.localStorage.setItem('user', payload.username)
    window.localStorage.setItem('id', payload.id)
    window.localStorage.setItem('login_method', 'local');
    state.user.push(payload)
    window.location = "/"
    // this.$router.push('/')
  },
  signUp: (state, payload) => {
    state.user.push(payload)
  }
}