<template>
  <div id="app">
    <title-bar />

    <navigation-menu />

    <pagination-control v-if="activatePaginationControl" />

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import NavigationMenu from '@/components/NavigationMenu'
import PaginationControl from '@/components/PaginationControl'

export default {
  name: 'App',
  components: { TitleBar, NavigationMenu, PaginationControl },
  computed: {
    activatePaginationControl: function () {
      return this.$route.name !== 'home'
    },
  },
}
</script>

<style scope>
#app::-webkit-scrollbar {
  width: 0 !important;
}

#app {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  padding-top: 1%;
  width: 100%;
  padding-left: 1%;
  padding-right: 1%;
  display: grid;
  grid-gap: 3px;
  overflow-y: scroll;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto auto;
  grid-template-areas: "t t t t t t t t t t t t" "n n p p p p p p p p p p"
    "n n c c c c c c c c c c";
}
.content::-webkit-scrollbar {
  width: 0 !important;
}

.content {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  grid-area: c;
  height: 70vh;
  overflow-y: scroll;
  justify-self: stretch;
  align-self: start;
}
</style>
