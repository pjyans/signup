<template>
  <div>
    <div>
      <span>
        <v-text-field
          ref="email"
          v-model="signUp.email"
          class="pl-3 pr-3"
          :rules="emailRule"
          required
          label="email"
          type="email"
        />
      </span>
      <v-text-field
        ref="password"
        v-model="signUp.password"
        class="pl-3 pr-3"
        :rules="passwordRule"
        required
        label="password"
        type="password"
      />
      <v-text-field
        ref="confirmPassword"
        v-model="signUp.confirmPassword"
        class="pl-3 pr-3"
        :rules="passwordConfirmRule"
        required
        label="confirmPassword"
        type="password"
      />
    </div>
    <v-btn type="button" class="btn_type btn_primary" @click="goNext()"
      >다음</v-btn
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'IndexPage',
  data() {
    return {
      signUp: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      emailRule: [
        (v) => !!v || '이메일을 작성해주세요.',
        (v) => {
          const replaceValue = v.replace(/(\s*)/g, '')
          const pattern =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
          return pattern.test(replaceValue) || '이메일 형식으로 입력해주세요'
        },
      ],
      passwordRule: [
        (v) => !!v || '비밀번호를 입력해주세요',
        (v) => {
          const replaceValue = v.replace(/(\s*)/g, '')
          return replaceValue.length >= 8 || '8자리 이상 입력해주세요.'
        },
        (v) => {
          const replaceValue = v.replace(/(\s*)/g, '')
          const pattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
          return (
            pattern.test(replaceValue) || '비밀번호 형식에 맞게 입력해주세요'
          )
        },
      ],
      passwordConfirmRule: [
        (v) => !!v || '비밀번호를 입력해주세요',
        (v) => {
          const replaceValue = v.replace(/(\s*)/g, '')
          return replaceValue.length >= 8 || '8자리 이상 입력해주세요.'
        },
        (v) => {
          const replaceValue = v.replace(/(\s*)/g, '')
          const pattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
          return (
            pattern.test(replaceValue) || '비밀번호 형식에 맞게 입력해주세요'
          )
        },
      ],
    }
  },
  computed: {
    ...mapState('signup', {
      stateSignUp: 'signUp',
    }),
  },
  methods: {
    goNext() {
      this.$store.commit('signup/setSignUp', this.signUp)
    },
  },
}
</script>
