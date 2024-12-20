<template>
  <div class="side-bar" :class="{ open: openSideBar }">
    <div class="side-wrapper">
      <router-link v-if="courseId == null" to="/cursos"><h5>Cursos</h5></router-link>
      <button v-if="courseId != null" @click="courseId = null" class="back-btn">Voltar para cursos</button>
      <CoursesSide v-if="courseId == null" @course-emit="(id) => courseId = id" />
      <CourseSide v-else :course-id="courseId" @side-bar-emit="onSideBarEmit"/>
    </div>
    <button class="open-btn" @click="openSideBar = !openSideBar"></button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import CoursesSide from '@/components/CoursesSide.vue';
import CourseSide from '@/components/CourseSide.vue';

const courseId = ref(null);
const openSideBar = ref(true);

onMounted(() => {
  if (window.innerWidth <= 540) {
    openSideBar.value = false;
  }
});

const onCourseEmit = (id) => {
  courseId.value = id;
}

const onSideBarEmit = () => {
  if (window.innerWidth <= 900) {
    openSideBar.value = !openSideBar.value;
  }
}

watch(openSideBar, () => {
  if (!openSideBar.value) {
    document.documentElement.style.setProperty('--side-bar-width', '60px');
  } else if (window.innerWidth > 900) {
    document.documentElement.style.setProperty('--side-bar-width', '300px');
  }
});
</script>

<style lang="scss">
@use '../assets/style/main.scss' as v;

.side-bar {
  width: var(--side-bar-width);
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: var(--black-color);
  color: var(--white-color);
  padding: 0;
  border-radius: 0 20px 20px 0;
  display: flex;
  justify-content: space-between;
  transition: var(--transition);
  z-index: 100;
  @include v.media(900px) {
    position: fixed;
    top: var(--header-height);
    &.open {
      width: 300px;
    }
  }
  @include v.media(540px) {
    width: 40px;
    top: calc(var(--header-height) + 10px);
    height: 40px;
    border-radius: 0 10px 10px 0;
    &.open {
      width: 100%;
      border-radius: 0;
      top: 0 !important;
      height: 100vh;
    }
  }
  &.open {
    padding: 10px 20px;
    padding-top: 20px;
    .side-wrapper {
      display: block;
      opacity: 1;
    }
    .open-btn {
      &::after {
        top: 20px;
        right: 20px;
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
      @include v.media(540px) {
        top: 10px;
        right: 10px;
        background-size: 15px;
        background-position: center;
      }
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