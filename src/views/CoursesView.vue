<template>
  <Loader v-if="loading" />
  <AppearTransition v-else>
    <div class="courses">
      <TypeTransition><h1 class="target-text agent-1">Cursos</h1></TypeTransition>
      <div class="grid agent-2">
        <div class="course" v-for="data in data" :key="data.id">
          <router-link :to="{ name: 'Course', params: { curso: data.id }}" class="course-link">
            <span>{{ data.category }}</span>
            <h4>{{ data.name }} | {{ totalDuration }}h</h4>
            <p>{{ data.description }}</p>
            <h5>{{ totalClasses[data.id] }} aulas</h5>
          </router-link>
        </div>
      </div>
    </div>
  </AppearTransition>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Loader from '@/components/Loader.vue'
import TypeTransition from '@/components/transitions/TypeTransition.vue';
import AppearTransition from '@/components/transitions/AppearTransition.vue';
import json from '@/api/api.json';

const loading = ref(true);
const data = ref(null);
const totalDuration = ref(0);
const totalClasses = ref({});
const video = ref({});

const fetchData = async () => {
  const courses = json.course;
  const classes = json.class;

  courses.forEach(async course => {
    const courseClasses = classes.filter(classe => classe.course === course.id);
    totalClasses.value[course.id] = courseClasses.length;
    courseClasses.forEach(classe => {
      video.value[classe.id] = classe.video;
    });
    await fetchVideoDurations(courseClasses);
  });

  data.value = courses;
};

const fetchVideoDurations = async (courseClasses) => {
  const videoIds = courseClasses.map(classe => video.value[classe.id]).join(',');
  const apiKey = 'AIzaSyAhRExcM6zUrfozCaJEzw7JFRsY01r5ZZs';
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoIds}&part=contentDetails&key=${apiKey}`);
  const result = await response.json();
  totalDuration.value = Math.ceil(result.items.reduce((sum, item) => {
    const duration = parseISO8601Duration(item.contentDetails.duration);
    return sum + duration;
  }, 0));
};

const parseISO8601Duration = (duration) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  return hours + (minutes / 60) + (seconds / 3600);
};

onMounted(async () => {
  await fetchData();
  loading.value = false;
});

</script>

<style lang="scss" scoped>
@use '../assets/style/main.scss' as v;

.courses {
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 40px;
    @include v.media(540px) { 
      margin-top: 20px;
    }
    .course {
      background-color: var(--white-color);
      border-radius: var(--border-radius);
      transition: var(--transition);
      position: relative;
      @include v.media(540px) {
        min-height: 230px;
      }
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