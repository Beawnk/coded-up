<template>
  <div class="side-bar">
    <h5 v-show="courseId == null">Cursos</h5>
    <div>
      <button v-show="courseId != null" @click="courseId = null" class="back-btn">Voltar para cursos</button>
    </div>
    <Suspense v-if="courseId == null"><CoursesSide @course-emit="(id) => courseId = id"/></Suspense>
    <Suspense v-else><CourseSide :course-id="courseId" /></Suspense>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import CoursesSide from '@/components/CoursesSide.vue';
import CourseSide from '@/components/CourseSide.vue';

const courseId = ref(null);

</script>

<style lang="scss" scoped>
.side-bar {
    width: var(--side-bar-width);
    background-color: var(--black-color);
    min-height: 100vh;
    color: var(--white-color);
    padding: 10px 20px;
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
</style>