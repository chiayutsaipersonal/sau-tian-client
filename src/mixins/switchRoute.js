export default {
  methods: {
    switchRoute (path) {
      if (this.$route.path !== path) this.$router.push(path)
    },
  },
}
