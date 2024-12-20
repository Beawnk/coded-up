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
import { onMounted } from 'vue';
import Header from '@/components/Header.vue'
import SideBar from '@/components/SideBar.vue';

onMounted(() => {
  //check if the user scrolled the page the same value as the --header-height and add top: 0 style to the side bar
  window.addEventListener('scroll', () => {
    const sideBar = document.querySelector('.side-bar');
    const classList = document.querySelector('.classes-list');
    if (window.scrollY >= 60) {
      if (window.innerWidth > 540) {
        sideBar.style.top = '0';
        classList.style.top = '0';
      } else {
        sideBar.style.top = '10px';
        classList.style.top = '10px';
      }
    } else {
      if (window.innerWidth > 540) {
        sideBar.style.top = 'var(--header-height)';
        classList.style.top = 'var(--header-height)';
      } else {
        sideBar.style.top = 'calc(var(--header-height) + 10px)';
        classList.style.top = 'calc(var(--header-height) + 10px)';
      }
    }
  });
});

</script>

<style lang="scss">
@use 'assets/style/main.scss' as v;

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
  min-height: calc(100vh - var(--header-height));
  @include v.media(900px) {
    justify-content: flex-end;
  }
  .main-content {
    width: calc(100% - var(--side-bar-width));
    background-color: var(--gray-color);
    border-radius: 20px 0 0 0;
    padding: 40px;
    padding-bottom: 80px;
    position: relative;
    transition: var(--transition);
    @include v.media(540px) { 
      width: 100%;
      padding: 30px;
      padding-bottom: 60px;
    }
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
