<template>
  <div>
    <div>
      <h1>{{ nextSignUp.name + '님 회원가입이 완료되었습니다' }}</h1>
    </div>
    <div>
      <v-text-field
        class="pl-3 pr-3"
        readonly
        v-text="signUp.email"
      ></v-text-field>
      <v-text-field class="pl-3 pr-3" readonly v-text="fullAddr"></v-text-field>
      <v-text-field
        class="pl-3 pr-3"
        readonly
        v-text="nextSignUp.phoneNo"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MemberInfo',
  computed: {
    ...mapState('signup', {
      signUp: 'signUp',
      nextSignUp: 'nextSignUp',
      addr: 'addr',
      cardNo: 'cardNo',
    }),
    fullAddr() {
      const fullAddr = this.addr?.zipCode
        ? '(' +
          this.addr?.zipCode +
          ') ' +
          this.addr?.addr +
          ' ' +
          this.nextSignUp?.addrDetail
        : ''
      return fullAddr
    },
  },
}
</script>

<style></style>
