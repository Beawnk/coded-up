<template>
    <div class="courses-list" v-if="data">
        <ul>
            <li v-for="course in data.courses" :key="course.id" class="course">
                <a href="" @click.prevent="openCourseSide(course.id)">{{ course.name }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import coursesData from '@/api/courses.json';

const emit = defineEmits(['courseEmit']);

const data = ref(coursesData);

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