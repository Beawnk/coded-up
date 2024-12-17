<template>
    <div class="courses-list">
        <ul>
            <li v-for="course in data.courses" :key="course.id" class="course">
                <a href="" @click.prevent="openCourseSide(course.id)">{{ course.name }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useFetchDataStore } from '@/stores/fetchData.js'

const emit = defineEmits(['courseEmit']);

const api = useFetchDataStore();
const data = await api.fetchData('/courses');

const openCourseSide = (id) => {
    emit('courseEmit', id);

}

</script>

<style lang="scss" scoped>
.courses-list {
    margin-top: 20px;

    ul {
        .course {
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--light-dark-color);
            &:last-child {
                margin-bottom: 0;
                border: none;
            }
            a {
                font-size: var(--text-medium);
                font-family: var(--ff-primary-light);
                transition: var(--transition);
                &:hover {
                    color: var(--primary-color);
                }
            }
        }
    }
}
</style>