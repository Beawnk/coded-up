<template>
  <div class="course-side">
    <div class="title">
      <span>Curso</span>
      <h5>{{ course.name }}</h5>
    </div>
    <div class="classes">
      <div class="category" :class="{open: openCategories.includes(category.category)}" v-for="category in course.classes" :key="category.category" @click="toggleCategory(category.category)">
        <p>{{ category.category }}</p>
        <ul v-show="openCategories.includes(category.category)">
          <li v-for="classe in category.classes" :key="classe.id">
            <a href="">{{ classe.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFetchDataStore } from '@/stores/fetchData.js'

const props = defineProps({
  courseId: {
    type: String,
    required: true
  }
});

const api = useFetchDataStore();
const course = await api.fetchData(`/course/${props.courseId}`);
const openCategories = ref([]);

const toggleCategory = (category) => {
  if (openCategories.value.includes(category)) {
    openCategories.value = openCategories.value.filter(c => c !== category);
  } else {
    openCategories.value.push(category);
  }
};
</script>

<style lang="scss" scoped>
.course-side {
    .title {
        margin-bottom: 20px;
        span {
            font-size: var(--text-small);
            color: var(--secondary-color);
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