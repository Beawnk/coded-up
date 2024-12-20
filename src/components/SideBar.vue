<template>
  <div class="side-bar" :class="{ open: openSideBar }">
    <div class="side-wrapper">
      <router-link v-if="courseId == null" to="/cursos"><h5>Cursos</h5></router-link>
      <button v-if="courseId != null" @click="courseId = null" class="back-btn">Voltar para cursos</button>
      <CoursesSide v-if="courseId == null" @course-emit="(id) => courseId = id" />
      <CourseSide v-else :course-id="courseId" />
    </div>
    <button class="open-btn" @click="openSideBar = !openSideBar"></button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import CoursesSide from '@/components/CoursesSide.vue';
import CourseSide from '@/components/CourseSide.vue';

const courseId = ref(null);
const openSideBar = ref(true);

watch(openSideBar, () => {
  if (!openSideBar.value) {
    document.documentElement.style.setProperty('--side-bar-width', '60px');
  } else {
    document.documentElement.style.setProperty('--side-bar-width', '300px');
  }
});
</script>

<style lang="scss">
.side-bar {
  width: var(--side-bar-width);
  position: sticky;
  top: 0;
  left: 0;
  height: calc(100vh - 80px);
  background-color: var(--black-color);
  height: calc(100vh);
  color: var(--white-color);
  padding: 0;
  border-radius: 0 20px 20px 0;
  display: flex;
  justify-content: space-between;
  transition: var(--transition);
  &.open {
    padding: 10px 20px;
    padding-top: 20px;
    .side-wrapper {
      display: block;
      opacity: 1;
    }
    .open-btn {
      &::after {
        transform: rotate(0);
      }
    }
  }
  h5 {
    transition: var(--transition);
    &:hover {
      color: var(--primary-color);
    }
  }
  .side-wrapper {
    opacity: 0;
    display: none;
    width: 100%;
  }
  .open-btn {
    width: 40px;
    height: 20px;
    display: block;
    transition: var(--transition);

    &::after {
      content: "";
      width: 20px;
      height: 20px;
      background-image: url('../assets/img/icons/open-arrow.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 100% 0;
      display: block;
      transition: var(--transition);
      position: absolute;
      transform: rotate(180deg);
      top: 20px;
      right: 20px;
    }
    &:hover {
      &::after {
        background-image: url('../assets/img/icons/open-arrow-hover.png');
      }
    }
    
  }
  .back-btn {
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--white-color);
    padding: 0;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    transition: var(--transition);
    &::before {
        content: '';
        margin-right: 5px;
        background-image: url('../assets/img/icons/arrow.png');
        background-size: contain;
        background-repeat: no-repeat;
        width: 20px;
        height: 20px;
        display: inline-block;
        background-position: center;
        transform: rotate(180deg);
        transition: var(--transition);
    }
    &:hover {
        color: var(--highlight-color);
        &::before {
            background-image: url('../assets/img/icons/arrow-hover.png');
        }
    }
  }
}


</style>