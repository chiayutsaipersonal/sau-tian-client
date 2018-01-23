export default {
  methods: {
    errorIndicator (message) {
      return this.$toast.open({
        duration: 3000,
        message: message,
        position: 'is-top',
        type: 'is-danger',
        queue: false,
      })
    },
  },
}
