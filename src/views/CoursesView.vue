<template>
  <Loader v-if="loading" />
  <AppearTransition v-else>
    <div class="courses">
      <TypeTransition><h1 class="target-text agent-1">Cursos</h1></TypeTransition>
      <div class="grid agent-2">
        <div class="course" v-for="data in data" :key="data.id">
          <router-link :to="{ name: 'Course', params: { curso: data.id }}" class="course-link">
            <span>{{ data.category }}</span>
            <h4>{{ data.name }} | {{ data.hours }}h</h4>
            <p>{{ data.description }}</p>
            <h5>{{ totalClasses(data.classes) }} aulas</h5>
          </router-link>
        </div>
      </div>
    </div>
  </AppearTransition>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import Loader from '@/components/Loader.vue'
import TypeTransition from '@/components/transitions/TypeTransition.vue';
import AppearTransition from '@/components/transitions/AppearTransition.vue';
import json from '@/api/api.json';

const loading = ref(true);
const data = ref(json.course);


const totalClasses = (classes) => {
  return classes.length;
};

onMounted(() => {
  loading.value = false;
});

</script>

<style lang="scss" scoped>
.courses {
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 40px;
    .course {
      background-color: var(--white-color);
      border-radius: var(--border-radius);
      transition: var(--transition);
      position: relative;
      &:hover {
        background-color: var(--dark-color);
      }
      a {
        padding: 20px;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: var(--dark-color);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &:hover {
          color: var(--primary-color);
          p {
            color: var(--white-color);
          }
        }
        h4 {
        margin-bottom: 10px;
        }
        p {
          margin-bottom: 10px;
        }
        h5 {
          color: var(--highlight-color);
        }
        span {
          position: absolute;
          top: 0;
          right: 0;
          background-color: var(--primary-color);
          color: var(--white-color);
          padding: 10px;
          border-radius: 0 8px 0 var(--border-radius);
          font-size: var(--text-small);
          font-weight: bold;
          overflow: hidden;
        }
      }
    }
  }
}
</style>