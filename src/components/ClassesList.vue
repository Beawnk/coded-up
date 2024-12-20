<template>
    <div class="classes-list agent-3" v-if="data" :class="{ open: classesListOpen }">
        <button class="open-btn" @click="classesListOpen = !classesListOpen"></button>
        <div class="class-list-wrapper">
            <h4>Aulas</h4>
            <div class="classes">
                <div class="class-wrapper">
                    <div class="category" :class="{open: openCategories.includes(category.category)}" v-for="category in data.classes" :key="category.category">
                        <div class="title" @click="toggleCategory(category.category)">
                            <h5>{{ category.category }} |<span>{{ category.classes.length }} aulas</span></h5>
                        </div>
                        <div v-show="openCategories.includes(category.category)" class="class" v-for="(classe, index) in category.classes" :key="classe.id" @click="emitActiveClass(classe.id)">
                            <router-link :to="{ name: 'Class', params: { aula: classe.id }}" custom v-slot="{ navigate, isActive }" @click="classesListOpen = !classesListOpen">
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
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import json from '@/api/api.json';

const props = defineProps({
    curso: String
});

const emit = defineEmits(['activeClass']);
const data = ref(null);
const openCategories = ref([]);
const videoThumb = ref({});
const classesListOpen = ref(false);

const fetchData = async (curso) => {
    data.value = json.course.find(course => course.id === curso);
    const classes = json.class;
    const courseClasses = classes.filter(classe => classe.course === curso);
    courseClasses.forEach(classe => {
      videoThumb.value[classe.id] = classe.video;
    });
};

const getThumbnail = (classId) => {
  return `https://img.youtube.com/vi/${videoThumb.value[classId]}/hqdefault.jpg`;
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

watch(classesListOpen, () => {
  if (!classesListOpen.value) {
    document.documentElement.style.setProperty('--classes-list-width', '60px');
  } else {
    document.documentElement.style.setProperty('--classes-list-width', '450px');
  }
});
</script>

<style lang="scss" scoped>
@use '../assets/style/main.scss' as v;

.classes-list {
    width: calc(30% - 40px);
    transition: var(--transition);
    @include v.media(1540px) {
        position: absolute;
        top: 0;
        right: 0;
        padding: 20px;
        width: var(--classes-list-width);
        background-color: var(--white-color);
        box-shadow: var(--shadow);
        border-radius: 20px 0 0 20px;
        height: calc(100vh - var(--header-height));
        &.open {
            .class-list-wrapper {
                display: block;
                opacity: 1;
            }
            .open-btn {
                transform: rotate(180deg);
                @include v.media(540px) { 
                    top: 25px;
                    left: calc(100% - 40px);
                }
            }
        }
    }
    @include v.media(540px) { 
        width: 40px;
        height: 40px;
        border-radius: 10px 0 0 10px;
        top: 10px;
        &.open {
            width: 100%;
            height: 100vh;
            border-radius: 0;
            top: 0;
        }
    } 
    h4 {
        margin-top: 40px;
        margin-bottom: 20px;
        @include v.media(540px) { 
            margin-top: 0;
            margin-left: 30px;
            margin-bottom: 10px;
        }
    }
    .open-btn {
        display: none;
        position: absolute;
        top: 20px;
        left: 20px;
        width: 20px;
        height: 20px;
        background-image: url('../assets/img/icons/open-arrow-black.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        transform: rotate(0);
        transition: var(--transition);
        &:hover {
            background-image: url('../assets/img/icons/open-arrow-hover.png');
        }
        @include v.media(1540px) {
            display: block;
        }
        @include v.media(540px) { 
            top: 10px;
            left: 10px;
            background-size: 15px;
        }
    }
    .class-list-wrapper {
        @include v.media(1540px) {
            display: none;
            opacity: 0;
        }
    }
    .class-wrapper {
        &::-webkit-scrollbar-thumb {
            background: var(--light-dark-color);
            border-radius: var(--border-radius);
            transition: var(--transition);
        }
        &::-webkit-scrollbar-thumb:hover {
            background: var(--primary-color);
        }
        @include v.media(1540px) {
            overflow-y: auto;
            height: calc(100vh - var(--header-height) - 130px);
            padding-right: 20px;
        }
    }
    .classes {
        position: relative;
        @include v.media(1540px) { 
            &::after {
            content: "";
            position: absolute;
            top: 0;
            width: 100%;
            height: 30px;
            display: block;
            background: linear-gradient(to top, rgba(255, 255, 255, 0) 0%, var(--white-color) 100%);
            z-index: 10;
            }
        }
        .category {
            margin-bottom: 20px;
            margin-top: 20px;
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
                padding: 10px;
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
                    height: 25vh;
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