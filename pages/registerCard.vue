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
    </div>
    <div class="btn_area">
      <v-btn type="button" class="btn_type btn_primary" @click="goComplete"
        >완료</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
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

  methods: {
    goComplete() {
      this.$store.commit('signup/setCardNo', this.cardNo)
      this.$router.push('/memberInfo')
    },
  },
}
</script>

<style></style>
