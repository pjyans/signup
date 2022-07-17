export const state = () => ({
  signUp: {
    email: '',
    password: '',
    confirmPassword: '',
  },
  addr: null,
  addrDetail: '',
  nextSignUp: {
    name: '',
    phoneNo: '',
    addrDetail: '',
  },
  cardNo: {
    cardNo1: '',
    cardNo2: '',
    cardNo3: '',
    cardNo4: '',
  },
})

export const mutations = {
  setSignUp(state, signUp) {
    state.signUp = signUp
  },
  setAddr(state, addr) {
    state.addr = addr
  },
  setAddrDetail(state, addrDetail) {
    state.addrDetail = addrDetail
  },
  setNextSignUp(state, nextSignUp) {
    state.nextSignUp = nextSignUp
  },
  setCardNo(state, cardNo) {
    state.cardNo = cardNo
  },
}
