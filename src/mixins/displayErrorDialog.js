export default {
  methods: {
    displayErrorDialog (message) {
      this.$dialog.alert({
        title: '錯誤',
        message,
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
      })
    },
  },
}
