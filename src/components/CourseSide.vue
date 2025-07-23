<template>
  <div v-if="course" class="course-side">
    <div class="title">
      <span>Curso</span>
      <router-link :to="{ name: 'Course', params: { curso: courseId }}" @click="handleSideBar"><h5>{{ course.name }}</h5></router-link>
    </div>
    <div class="classes">
      <div class="category" :class="{open: openCategories.includes(category.category)}" v-for="category in course.classes" :key="category.category">
        <p @click="toggleCategory(category.category)">{{ category.category }}</p>
        <ul v-show="openCategories.includes(category.category)">
          <li v-for="classe in category.classes" :key="classe.id">
            <router-link :to="{ name: 'Class', params: { curso: courseId, aula: classe.id }}" @click="handleSideBar">{{ classe.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import courseDataJson from '@/api/course.json';

const emit = defineEmits(['sideBarEmit']);

const props = defineProps({
  courseId: {
    type: String,
    required: true
  }
});

const courseData = ref(courseDataJson);
const course = ref(null);
const openCategories = ref([]);

const fetchData = async (courseId) => {

    course.value = courseData.value.find((c) => c.id === courseId);
    if (!course.value) {
      console.error('Course not found for ID:', courseId);
    }
};

onMounted(async () => {
  await fetchData(props.courseId);
  if (course.value && course.value.classes && course.value.classes.length > 0) {
    openCategories.value.push(course.value.classes[0].category);
  }
});

const toggleCategory = (category) => {
  if (openCategories.value.includes(category)) {
    openCategories.value = openCategories.value.filter(c => c !== category);
  } else {
    openCategories.value.push(category);
  }
};

const handleSideBar = () => {
  emit('sideBarEmit');
};

watch(() => props.courseId, async (newVal) => {
  await fetchData(newVal);
  if (course.value && course.value.classes && course.value.classes.length > 0) {
    openCategories.value.push(course.value.classes[0].category);
  }
});
</script>

<style lang="scss" scoped>
.course-side {
    .title {
        margin-bottom: 20px;
        span {
            font-size: var(--text-small);
            color: var(--secondary-color);
        }
        h5 {
          &:hover {
            color: var(--primary-color);
          }
        }
    } 
    .classes {
        .category {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
            p {
              font-size: var(--text-medium);
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;
              &::after {
                content: '';
                width: 10px;
                height: 10px;
                display: inline-block;
                background-image: url('../assets/img/icons/arrow-down.png');
                background-size: contain;
                transition: var(--transition);
              }
            }
            &.open {
              p::after {
                transform: rotate(-180deg);
              }
              ul {
                transform: translateY(0);
                opacity: 1;
                @starting-style {
                  transform: translateY(-10px);
                  opacity: 0;
                }
              }
            }
            ul {
                transform: translateY(-10px);
                opacity: 0;
                transition-property: overlay, display, opacity, transform;
                transition-duration: 0.3s;
                transition-behavior: allow-discrete;
                li {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    
                    @for $i from 1 through 10 {
                        &:nth-of-type(#{$i})::before {
                            content: "#{$i}";
                            margin-right: 10px;
                            border: 1px solid var(--secondary-color);
                            border-radius: 50%;
                            width: 15px;
                            height: 15px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 11px;
                            font-family: var(--ff-primary-light);
                            color: var(--secondary-color);
                            transition: var(--transition);
                        }
                    }
                    &:hover::before {
                        background-color: var(--primary-color);
                        color: var(--black-color);
                        border-color: var(--primary-color);
                    }
                    &:last-child {
                        margin-bottom: 0;
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
    }
}
</style>