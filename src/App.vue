<template>
  <Header />
  <div class="wrapper"> 
    <SideBar />
    <div class="main-content">
      <Suspense><RouterView /></Suspense>
      <a href="https://storyset.com/work" class="attribute">Work illustrations by Storyset</a>
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
  border-radius: 5px;
  background-color: var(--highlight-color);
  color: var(--white-color);
  border: none;
  cursor: pointer;
  transition: var(--transition);
  font-size: var(--text-medium);
  &:hover {
    background-color: var(--primary-color);
  }
}

.wrapper {
  display: flex;
  justify-content: space-between;
  position: relative;
  .main-content {
    width: calc(100% - var(--side-bar-width));
    background-color: var(--gray-color);
    border-radius: 20px 0 0 0;
    padding: 40px;
    padding-bottom: 80px;
    position: relative;
    transition: var(--transition);
    p {
      font-size: var(--text-big);
      color: var(--light-dark-color);
      font-family: var(--ff-primary-light);
    }
    strong {
      color: var(--dark-color);
      font-family: var(--ff-primary-semibold);
      font-weight: normal;
    }
    .attribute {
      display: block;
      color: var(--light-dark-color);
      font-size: var(--text-small);
      text-align: center;
      text-decoration: none;
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

</style>
