<template>
    <AppearTransition>
        <div class="course-page" v-if="data">
            <div class="presentation">
                <KeepAlive v-if="activeClass === null">
                    <div>
                        <TypeTransition><h1 class="target-text agent-1">{{ data.name }}</h1></TypeTransition>
                        <div class="course-img agent-2">
                            <img :src="getImageUrl(data.img)" alt="Imagem do curso">
                        </div>
                        <h4 class="agent-3">Descrição</h4>
                        <p class="description agent-4">{{ data.description }}</p>
                        <h4 class="agent-5">Detalhes do curso</h4>
                        <div class="details agent-6">
                            <div class="detail duration">
                                <p>Duração</p>
                                <h6>{{ totalDuration }} horas</h6>
                            </div>
                            <div class="detail classes">
                                <p>Aulas</p>
                                <h6>{{ totalClasses }}</h6>
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
                <Suspense v-else><RouterView @clear-active-class="onClearActiveClass" @set-active-class="setActiveClass" :curso="curso" /></Suspense>
            </div>
            <Suspense><ClassesList :curso="curso" @active-class="setActiveClass" /></Suspense>
        </div>
    </AppearTransition>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import ClassesList from '@/components/ClassesList.vue';
import TypeTransition from '@/components/transitions/TypeTransition.vue';
import AppearTransition from '@/components/transitions/AppearTransition.vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import json from '@/api/api.json';

const props = defineProps({
    curso: String
});

const data = ref(null);
const activeClass = ref(null);
const videoThumb = ref({});
const totalDuration = ref(0);
const totalClasses = ref(0);
const route = useRoute();


const fetchData = async (curso) => {
    data.value = json.course.find(course => course.id === curso);
    const classes = json.class;
    const courseClasses = classes.filter(classe => classe.course === curso);
    totalClasses.value = courseClasses.length;
    courseClasses.forEach(classe => {
      videoThumb.value[classe.id] = classe.video;
    });
    await fetchVideoDurations(courseClasses);
};

const fetchVideoDurations = async (courseClasses) => {
  const videoIds = courseClasses.map(classe => videoThumb.value[classe.id]).join(',');
  const apiKey = 'AIzaSyAhRExcM6zUrfozCaJEzw7JFRsY01r5ZZs';
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoIds}&part=contentDetails&key=${apiKey}`);
  const result = await response.json();
  totalDuration.value = Math.ceil(result.items.reduce((sum, item) => {
    const duration = parseISO8601Duration(item.contentDetails.duration);
    return sum + duration;
  }, 0));
};

const parseISO8601Duration = (duration) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  return hours + (minutes / 60) + (seconds / 3600);
};

const setActiveClass = (classId) => {
  activeClass.value = classId;
};

const getImageUrl = (imageName) => {
    return new URL(`../assets/img/course-img/${imageName}`, import.meta.url).href;
};


onMounted(async () => {
  await fetchData(props.curso);
  if (route.params.aula) {
    setActiveClass(route.params.aula);
  }
});

onBeforeRouteUpdate(async (to, from, next) => {
    await fetchData(to.params.curso);
    if (to.params.aula) {
        setActiveClass(to.params.aula);
    } else {
        onClearActiveClass();
    }
    next();
});

const onClearActiveClass = () => {
    activeClass.value = null;
};

watch(() => props.curso, async (newVal) => {
    await fetchData(newVal);
});
</script>

<style lang="scss">
@use '../assets/style/main.scss' as v;

:root {
    --presentation-width: calc(70% + 40px);
}
.course-page {
    display: flex;
    // position: relative;
    .presentation {
        width: var(--presentation-width);
        margin-right: 40px;
        @include v.media(1540px) {
            width: calc(100% - 60px);
            margin-right: 0;
        }
        @include v.media(500px) { 
            width: 100%;
        }
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
            @include v.media(1540px) {  
                max-width: 100%;
            }
        }
        h4 {
            margin-bottom: 20px;
        }
        .details {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            @include v.media(500px) {
                grid-template-columns: 1fr;
            }
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
}

</style>