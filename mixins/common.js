export default {
  methods: {
    deepCopy(obj) {
      if (obj === null || typeof obj !== 'object') {
        return obj
      }

      const copy = {}
      for (const key in obj) {
        copy[key] = this.deepCopy(obj[key])
      }
      return copy
    },
  },
}
