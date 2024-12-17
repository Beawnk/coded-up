<template>
  <Loader v-if="api.loading" />
  <AppearTransition v-else></AppearTransition>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useFetchDataStore } from '@/stores/fetchData.js'
import Loader from '@/components/Loader.vue'
import TypeTransition from '@/components/transitions/TypeTransition.vue';
import AppearTransition from '@/components/transitions/AppearTransition.vue';

const api = useFetchDataStore();
const data = await api.fetchData('/courses');

</script>

<style lang="scss" scoped>

</style>