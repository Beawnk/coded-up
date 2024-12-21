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
import { onMounted, ref } from 'vue';
import { supabase } from '@/lib/supabaseClient'

const emit = defineEmits(['courseEmit']);

const data = ref(null);

const fetchData = async () => {
  const { data: coursesData, error } = await supabase.from('courses').select('*').single();
  if (error) {
    console.error('Error fetching courses:', error);
  } else {
    data.value = coursesData;
  }
};

onMounted(async () => {
    await fetchData();
});

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