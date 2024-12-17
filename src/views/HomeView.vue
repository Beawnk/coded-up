<template>
    <Loader v-if="api.loading" />
    <AppearTransition v-else>
        <div>
            <TypeTransition>
                <h1 class="target-text agent-1">Home</h1>
            </TypeTransition>
            <div class="agent-2 content">
                <h4>Sobre a {{ data.title }}</h4>
                <p>{{ data.description }}</p>
            </div>
        </div>
    </AppearTransition>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useFetchDataStore } from '@/stores/fetchData.js'
import Loader from '@/components/Loader.vue'
import TypeTransition from '@/components/transitions/TypeTransition.vue';
import AppearTransition from '@/components/transitions/AppearTransition.vue';

const api = useFetchDataStore();

const data = await api.fetchData('/home');

</script>

<style lang="scss" scoped>

</style>