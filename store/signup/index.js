export const state = () => ({
  signUp: {
    email: '',
    password: '',
    confirmPassword: '',
  },
})

export const mutations = {
  setSignUp(state, signUp) {
    state.signUp = signUp
  },
}
