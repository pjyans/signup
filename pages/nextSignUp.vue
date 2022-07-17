<template>
  <div>
    <div>
      <v-text-field
        ref="name"
        v-model="nextSignUp.name"
        class="pl-3 pr-3"
        :rules="nameRule"
        required
        label="name"
        type="text"
      />
      <v-text-field
        ref="phoneNo"
        v-model="nextSignUp.phoneNo"
        class="pl-3 pr-3"
        :rules="phoneNoRule"
        required
        label="phoneNo"
        type="tel"
      />
      <addr-search></addr-search>
      <v-text-field
        ref="addrDetail"
        v-model="nextSignUp.addrDetail"
        :rules="addrDetailRule"
        class="pl-3 pr-3"
        label="addrDetail"
        type="text"
      />
    </div>
    <div class="btn_area">
      <v-btn type="button" class="btn_type btn_primary" @click="goBack()"
        >이전</v-btn
      >
      <v-btn
        type="button"
        class="btn_type btn_primary"
        :disabled="doDisabled"
        @click="goNext()"
        >다음</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import addrSearch from '../components/addrSearch.vue'
import common from '~/mixins/common.js'
export default {
  name: 'NextSignUp',
  components: { addrSearch },
  mixins: [common],
  data() {
    return {
      nextSignUp: {
        name: '',
        phoneNo: '',
        addrDetail: '',
      },
      doDisabled: true,
      addrDetailRule: [(v) => !!v || '상세주소를 입력해주세요'],
      nameRule: [
        (v) => !!v || '이름을 작성해주세요.',
        (v) => {
          const replaceValue = v.replace(/(\s*)/g, '')
          const pattern = /^[가-힣]{2,}$/
          const pattern2 = /^[a-zA-z]{3,}$/
          return (
            pattern.test(replaceValue) ||
            pattern2.test(replaceValue) ||
            '이름 형식에 맞게 입력해주세요'
          )
        },
      ],
      phoneNoRule: [
        (v) => !!v || '전화번호를 작성해주세요.',
        (v) => {
          const replaceValue = v.replace(/(\s*)/g, '')
          const pattern = /^0\d{2}-?\s?\d{3,4}-?\s?\d{4}$/
          return (
            pattern.test(replaceValue) || '전화번호 형식에 맞게 입력해주세요'
          )
        },
      ],
    }
  },
  computed: {
    ...mapState('signup', {
      stateNextSignUp: 'nextSignUp',
    }),
  },
  watch: {
    nextSignUp: {
      handler() {
        this.validate()
      },
      deep: true,
    },
  },
  async mounted() {
    this.nextSignUp = this.deepCopy(this.stateNextSignUp)
    await this.$nextTick()
    this.validate()
  },
  methods: {
    validate() {
      if (
        this.$refs.name.validate() &&
        this.$refs.phoneNo.validate() &&
        this.$refs.addrDetail.validate()
      ) {
        this.doDisabled = false
      } else {
        this.doDisabled = true
      }
      this.nameBlankCheck()
    },
    nameBlankCheck() {
      this.nextSignUp.name = this.nextSignUp.name.replace(/(\s*)/g, '')
    },
    goNext() {
      this.$store.commit('signup/setNextSignUp', this.nextSignUp)
      this.$router.push('registerCard')
    },
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>
