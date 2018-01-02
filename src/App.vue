<template>
  <div
    id="app"
    class="container"
  >
    <title-bar/>

    <navigation-menu/>

    <div class="content">
      <router-view/>
    </div>

    <footer-bar v-if="this.$route.name!=='home'" />
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import NavigationMenu from '@/components/NavigationMenu'
import FooterBar from '@/components/FooterBar'

export default {
  name: 'App',
  components: { TitleBar, NavigationMenu, FooterBar },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 10px;
}

.container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-gap: 3px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 100px auto 100px;
}

.content::-webkit-scrollbar {
  width: 0 !important;
}

.content {
  grid-column: 3 / -1;
  align-self: stretch;
  overflow-y: scroll;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
</style>
