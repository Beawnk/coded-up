<template>
    <div class="courses-list">
        <ul>
            <li v-for="course in data.cursos" :key="course.id">
                <a href="" @click.prevent="openCourseSide(course.id)">{{ course.nome }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useFetchDataStore } from '@/stores/fetchData.js'

const emit = defineEmits(['courseEmit']);

const api = useFetchDataStore();
const data = await api.fetchData('/cursos');

const openCourseSide = (id) => {
    emit('courseEmit', id);

}

</script>

<style lang="scss" scoped>

</style>