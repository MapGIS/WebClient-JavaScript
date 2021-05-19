<template>
  <section class="app-main">
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style lang="scss">
.app-main {
  a:focus,
  a:hover {
    text-decoration: none;
  }
  span:focus,
  span:hover {
    text-decoration: none;
  }
}
</style>
