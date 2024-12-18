<template>
    <AppearTransition>
        <div class="course-page" v-if="data">
            <div class="presentation">
                <KeepAlive v-if="activeClass === null">
                    <div>
                        <TypeTransition><h1 class="target-text agent-1">{{ data.name }}</h1></TypeTransition>
                        <div class="course-img agent-2">
                            <img :src="data.img" alt="Imagem do curso">
                        </div>
                        <h4 class="agent-3">Descrição</h4>
                        <p class="description agent-4">{{ data.description }}</p>
                        <h4 class="agent-5">Detalhes do curso</h4>
                        <div class="details agent-6">
                            <div class="detail duration">
                                <p>Duração</p>
                                <h6>{{ data.hours }} horas</h6>
                            </div>
                            <div class="detail classes">
                                <p>Aulas</p>
                                <h6>{{ data.totalClasses }}</h6>
                            </div>
                            <div class="detail category">
                                <p>Categoria</p>
                                <h6>{{ data.category }}</h6>
                            </div>
                            <div class="detail level">
                                <p>Nível</p>
                                <h6>{{ data.skillLevel }}</h6>
                            </div>
                        </div>
                    </div>
                </KeepAlive>
                <Suspense v-else><RouterView @clear-active-class="onClearActiveClass" @set-active-class="setActiveClass" /></Suspense>
            </div>
            <div class="classes-list">
                <h4>Aulas</h4>
                <div class="classes">
                    <div class="category" :class="{open: openCategories.includes(category.category)}" v-for="category in data.classes" :key="category.category">
                        <div class="title" @click="toggleCategory(category.category)">
                            <h5>{{ category.category }} |<span>{{ category.classes.length }} aulas</span></h5>
                        </div>
                        <div v-show="openCategories.includes(category.category)" class="class" v-for="classe in category.classes" :key="classe.id" @click="activeClass = classe.id">
                            <router-link :to="{ name: 'Class', params: { aula: classe.id }}" custom v-slot="{ navigate, isActive }">
                                <div @click="navigate" @keypress.enter="navigate" role="link" :class="{ 'active-class': isActive }">
                                    <div class="video">
                                    
                                    </div>
                                    <p>{{ classe.name }}</p>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppearTransition>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useFetchDataStore } from '@/stores/fetchData.js'
import TypeTransition from '@/components/transitions/TypeTransition.vue';
import AppearTransition from '@/components/transitions/AppearTransition.vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const props = defineProps({
    curso: String
});

const emit = defineEmits(['clearActiveClass', 'setActiveClass']);

const api = useFetchDataStore();
const data = ref(null);
const openCategories = ref([]);
const activeClass = ref(null);

const fetchData = async (curso) => {
  data.value = await api.fetchData(`/course/${curso}`);
};

const setActiveClass = (classId) => {
  activeClass.value = classId;
};

const route = useRoute();

onMounted(async () => {
  await fetchData(props.curso);
  if (data.value.classes.length > 0) {
    openCategories.value.push(data.value.classes[0].category);
  }
  if (route.params.aula) {
    setActiveClass(route.params.aula);
  }
});

onBeforeRouteUpdate(async (to, from, next) => {
    await fetchData(to.params.curso);
    setActiveClass(to.params.aula);
    next();
});

const toggleCategory = (category) => {
  if (openCategories.value.includes(category)) {
    openCategories.value = openCategories.value.filter(c => c !== category);
  } else {
    openCategories.value.push(category);
  }
};

const onClearActiveClass = () => {
    activeClass.value = null;
};

watch(() => props.curso, async (newVal) => {
    await fetchData(newVal);
});
</script>

<style lang="scss">
:root {
    --presentation-width: calc(70% + 40px);
}
.course-page {
    display: flex;
    .presentation {
        width: var(--presentation-width);
        margin-right: 40px;
        h1 {
            margin-bottom: 20px;
        }
        .course-img {
            width: 100%;
            margin-bottom: 20px;
            img {
                width: 100%;
                height: auto;
                border-radius: var(--border-radius);
            }
        }
        .description {
            margin-bottom: 40px;
            max-width: 90%;
        }
        h4 {
            margin-bottom: 20px;
        }
        .details {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            .detail {
                background-color: var(--white-color);
                padding: 20px;
                border-radius: var(--border-radius);
                p {
                    font-size: var(--text-small);
                    margin-bottom: 10px;
                }
                h6 {
                    display: flex;
                    align-items: center;
                    &::before {
                        content: '';
                        display: inline-block;
                        width: 15px;
                        height: 15px;
                        background-position: center;
                        background-size: 15px;
                        background-repeat: no-repeat;
                        margin-right: 5px;
                    }
                    
                }
                &.duration h6::before {
                    background-image: url('../assets/img/icons/horas.png');
                }
                &.classes h6::before {
                    background-image: url('../assets/img/icons/aulas.png');
                }
                &.category h6::before {
                    background-image: url('../assets/img/icons/category.png');
                }
                &.level h6::before {
                    background-image: url('../assets/img/icons/level.png');
                }
            }
        }
    }
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
                        background-color: var(--dark-color);
                        p {
                            color: var(--primary-color);
                        }
                    }
                    &:has(.active-class) {
                        background-color: var(--primary-color);
                        &:hover {
                            p {
                                color: var(--light-dark-color);
                            }
                        }
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
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
}

</style>