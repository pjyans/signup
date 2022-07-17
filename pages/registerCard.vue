<template>
  <div>
    <h3>카드번호</h3>
    <div>
      <v-row>
        <v-col>
          <v-text-field
            v-model="cardNo.cardNo1"
            :rules="rules.number"
            :maxlength="4"
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="cardNo.cardNo2"
            :rules="rules.number"
            :maxlength="4"
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="cardNo.cardNo3"
            :rules="rules.number"
            :maxlength="4"
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="cardNo.cardNo4"
            :rules="rules.number"
            :maxlength="4"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <span>{{
        isEmpty(strCardNo) || strCardNo.length !== 16
          ? ''
          : doDisabled
          ? '정상적인 카드번호가 아닙니다.'
          : '정상적인 카드번호 입니다.'
      }}</span>
    </div>
    <div class="btn_area">
      <v-btn
        type="button"
        class="btn_type btn_primary"
        :disabled="doDisabled"
        @click="goComplete"
        >완료</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import common from '~/mixins/common.js'
export default {
  mixins: [common],
  data() {
    return {
      doDisabled: true,
      cardNo: {
        cardNo1: '',
        cardNo2: '',
        cardNo3: '',
        cardNo4: '',
      },
      strCardNo: '',
      rules: {
        number: [
          (v) => !!v || '번호를 입력해주세요',
          (v) => /^[0-9]*$/.test(v) || '숫자만 입력해주세요',
          (v) => !(v && v.length !== 4) || '4자리를 입력해주세요',
        ],
      },
    }
  },

  computed: {
    ...mapState('signup', {
      stateCardNo: 'cardNo',
    }),
  },
  watch: {
    cardNo: {
      handler() {
        this.validCardCheck()
      },
      deep: true,
    },
  },
  async mounted() {
    this.cardNo = this.deepCopy(this.stateCardNo)
    await this.$nextTick()
    this.validCardCheck()
  },
  methods: {
    validCardCheck() {
      this.strCardNo =
        this.cardNo.cardNo1 +
        this.cardNo.cardNo2 +
        this.cardNo.cardNo3 +
        this.cardNo.cardNo4

      this.doDisabled = true
      if (this.isNotEmpty(this.strCardNo) && this.strCardNo.length === 16) {
        const arr = this.strCardNo
          .split('')
          // 오른쪽부터 시작 역순 정렬
          .reverse()
          .map((str) => parseInt(str))
          .reduce((acc, cur, i) => {
            // (짝수번째 자릿수 * 2) > 9 인 경우에만 각각의 자릿수 더함
            if ((i + 1) % 2 === 0) {
              if (cur * 2 > 9) {
                acc.push(cur)
              }
              // 홀수번째 숫자는 값 변경없음
            } else {
              acc.push(cur)
            }
            return acc
          }, [])
        const sum = arr.reduce((a, b) => a + b, 0)
        // 해당 배열에 존재하는 값 모두 더해서 나눈 나머지가 0일때만 유효
        if (sum % 10 === 0) {
          this.doDisabled = false
        } else {
          this.doDisabled = true
        }
      }
    },
    goComplete() {
      this.$store.commit('signup/setCardNo', this.cardNo)
      this.$router.push('/memberInfo')
    },
  },
}
</script>

<style></style>
