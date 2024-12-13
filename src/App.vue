<template>
  <Header />
  <div class="wrapper"> 
    <SideBar />
    <div class="main-content">
      <Suspense><RouterView /></Suspense>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import SideBar from '@/components/SideBar.vue';

</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  .main-content {
    width: calc(100% - var(--side-bar-width));
    background-color: var(--white-color);
    border-radius: 20px;
    padding: 30px;
  }
}

</style>
