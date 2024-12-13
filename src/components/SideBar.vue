<template>
  <div class="side-bar">
    <h5 v-show="courseId == null">Cursos</h5>
    <div>
      <button v-show="courseId != null" @click="courseId = null">Voltar</button>
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
</style>