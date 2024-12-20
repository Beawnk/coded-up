<template>
  <div class="class-view" v-if="data">
    <button @click="goBack" class="back-btn">Voltar para curso</button>
    <TypeTransition><h1 class="target-text agent-1">{{ data.name }}</h1></TypeTransition>
    <div class="class-video agent-2">
      <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${data.video}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <p>{{ data.content }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import TypeTransition from '@/components/transitions/TypeTransition.vue';
import json from '@/api/api.json';

const props = defineProps({
  aula: String,
  curso: String
});

const emit = defineEmits(['clearActiveClass', 'setActiveClass']);

const data = ref(null);

const router = useRouter();
const route = useRoute();

const fetchData = async (aula) => {
  data.value = json.class.find(classe => classe.id === aula);
  emit('setActiveClass', aula);
};

const goBack = () => {
  router.push({ name: 'Course', params: { curso: props.curso } });
  emit('clearActiveClass');
};

onBeforeRouteUpdate(async (to, from, next) => {
  await fetchData(to.params.aula);
  next();
});

onMounted(async () => {
  await fetchData(props.aula);
});
</script>

<style lang="scss" scoped>
@use '../assets/style/main.scss' as v;

.class-view {
  .back-btn {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    transition: var(--transition);
    @include v.media(500px) { 
      margin-left: 10px;
    }
    &::before {
      content: '';
      width: 10px;
      height: 11px;
      margin-right: 10px;
      background-image: url('../assets/img/icons/arrow-black.png');
      background-repeat: no-repeat;
      background-position: 0.5px 0px;
      background-size: contain;
      transform: rotate(90deg);
    }
    &:hover {
      background-color: var(--highlight-color);
    }
  }
  .class-video {
    width: 100%;
    position: relative;
    overflow: hidden;
    padding-bottom: 60vh;
    border-radius: var(--border-radius);
    margin-bottom: 40px;
    @include v.media(900px) {
      padding-bottom: 40vh;
    }
    @include v.media(500px) {
      padding-bottom: 30vh;
      margin-bottom: 20px;
    }
    iframe {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>