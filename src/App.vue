<template>
  <div id="app">
    <Header />
    <main class="main">
      <router-view/>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {Header, Footer}
}
</script>

<style lang="scss">
@import '@/assets/styles/index';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: Avenir, sans-serif;
  font-size: 10px;
  color: $main-color;
  background-color: $background-color;
}

.main {
  min-height: calc(100vh - #{$header-height} - #{$footer-height});
  max-width: 110rem;
  padding: 1rem 2rem 0;
  margin: auto;
  border-top: .1rem solid $warning-color;
}
</style>
