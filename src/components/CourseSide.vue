<template>
  <p>{{ course }}</p>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useFetchDataStore } from '@/stores/fetchData.js'

const props = defineProps({
  courseId: {
    type: String,
    required: true
  }
});

const api = useFetchDataStore();
const course = ref(null);

const fetchCourse = async (courseId) => {
  if (courseId != null) {
    const fetchedData = await api.fetchData(`/curso/${courseId}`);
    course.value = fetchedData;
    console.log('Fetched course:', course.value); // Debugging log
  }
};

watch(() => props.courseId, (newVal) => {
  console.log('CourseSide watch:', newVal); // Debugging log
  fetchCourse(newVal);
});

onMounted(() => {
  fetchCourse(props.courseId);
  console.log('CourseSide mounted', props.courseId); // Debugging log
});
</script>

<style lang="scss" scoped>
</style>