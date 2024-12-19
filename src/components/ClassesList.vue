<template>
    <div class="classes-list agent-3" v-if="data">
        <h4>Aulas</h4>
        <div class="classes">
            <div class="category" :class="{open: openCategories.includes(category.category)}" v-for="category in data.classes" :key="category.category">
                <div class="title" @click="toggleCategory(category.category)">
                    <h5>{{ category.category }} |<span>{{ category.classes.length }} aulas</span></h5>
                </div>
                <div v-show="openCategories.includes(category.category)" class="class" v-for="(classe, index) in category.classes" :key="classe.id" @click="emitActiveClass(classe.id)">
                    <router-link :to="{ name: 'Class', params: { aula: classe.id }}" custom v-slot="{ navigate, isActive }">
                        <div @click="navigate" @keypress.enter="navigate" role="link" :class="{ 'active-class': isActive }">
                            <div class="video">
                                <img :src="getThumbnail(classe.id)" alt="Thumbnail">
                            </div>
                            <p>{{ index + 1 }}. {{ classe.name }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useFetchDataStore } from '@/stores/fetchData.js';

const props = defineProps({
    curso: String
});

const emit = defineEmits(['activeClass']);
const api = useFetchDataStore();
const data = ref(null);
const openCategories = ref([]);
const videoThumb = ref({});

const fetchData = async (curso) => {
    data.value = await api.fetchData(`/course/${curso}`);
    const classes = await api.fetchData(`/class`);
    const courseClasses = classes.filter(classe => classe.course === curso);
    courseClasses.forEach(classe => {
      videoThumb.value[classe.id] = classe.video;
    });
};

const getThumbnail = (classId) => {
  return `https://img.youtube.com/vi/${videoThumb.value[classId]}/mqdefault.jpg`;
};

const emitActiveClass = (classe) => {
    emit('activeClass', classe);
};

const toggleCategory = (category) => {
  if (openCategories.value.includes(category)) {
    openCategories.value = openCategories.value.filter(c => c !== category);
  } else {
    openCategories.value.push(category);
  }
};

const openAllCategories = () => {
    if (data.value && data.value.classes.length > 0) {
        openCategories.value = data.value.classes.map(category => category.category);
    }
};

onMounted(async () => {
    await fetchData(props.curso);
    openAllCategories();
});

watch(() => props.curso, async (newVal) => {
    await fetchData(newVal);
    openAllCategories();
});
</script>

<style lang="scss" scoped>
.classes-list {
    width: calc(30% - 40px);
    h4 {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .classes {
        .category {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
            &.open {
                .title::after {
                    transform: rotate(-180deg);
                }
                .class {
                    transform: translate3d(0, 0, 0);
                    opacity: 1;
                    @starting-style {
                        transform: translateX(-10px);
                        opacity: 0;
                    }
                }
            }
            .title {
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                h5 {
                    display: flex;
                    align-items: center;
                    span {
                        margin-left: 5px;
                    }
                }
                &::after {
                    content: '';
                    width: 10px;
                    height: 10px;
                    display: inline-block;
                    background-image: url('../assets/img/icons/arrow-black.png');
                    background-size: contain;
                    transition: var(--transition);
                }
            }
            .class {
                cursor: pointer;
                background-color: var(--white-color);
                padding: 20px;
                border-radius: var(--border-radius);
                margin-bottom: 10px;
                transform: translateX(-10px);
                opacity: 0;
                transition-property: overlay, display, opacity, transform, background-color;
                transition-duration: 0.3s;
                transition-behavior: allow-discrete;
                &:hover {
                    background-color: var(--primary-color);
                    p {
                        color: var(--dark-color);
                    }
                }
                &:has(.active-class) {
                    border: 3px solid var(--primary-color);
                }
                p {
                    font-size: var(--text-big);
                    font-family: var(--ff-primary);
                }
                .video {
                    width: 100%;
                    height: 200px;
                    background-color: var(--light-dark-color);
                    border-radius: var(--border-radius);
                    overflow: hidden;
                    margin-bottom: 10px;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
        }
    }
}
</style>