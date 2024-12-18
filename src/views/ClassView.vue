<template>
  <div class="class-view" v-if="data">
    <button @click="goBack">Voltar para curso</button>
    <TypeTransition><h1 class="target-text agent-1">{{ data.name }}</h1></TypeTransition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useFetchDataStore } from '@/stores/fetchData.js';
import TypeTransition from '@/components/transitions/TypeTransition.vue';

const props = defineProps({
  aula: String
});

const emit = defineEmits(['clearActiveClass', 'setActiveClass']);

const api = useFetchDataStore();
const data = ref(null);

const router = useRouter();
const route = useRoute();

const fetchData = async (aula) => {
  data.value = await api.fetchData(`/class/${aula}`);
  emit('setActiveClass', aula);
};

const goBack = () => {
  emit('clearActiveClass');
  router.go(-1);
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

</style>