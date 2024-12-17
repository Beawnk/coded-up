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

<style lang="scss">
.btn {
  padding: 10px 20px;
  border-radius: 10px;
  background-color: var(--primary-color);
  color: var(--white-color);
  border: none;
  cursor: pointer;
  transition: var(--transition);
  &:hover {
    background-color: var(--highlight-color);
  }
}

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
