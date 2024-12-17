<template>
    <Loader v-if="api.loading" />
    <AppearTransition v-else>
        <div class="contact">
            <TypeTransition><h1 class="target-text agent-1">{{ contact.title }}</h1></TypeTransition>
            <p class="agent-2">{{ contact.description }}</p>
            <div class="contact-info agent-3">
                <div class="info">
                    <p><strong>Email: </strong>{{ contact.contact.email }}</p>
                    <p><strong>Telefone: </strong>{{ contact.contact.phone }}</p>
                    <p><strong>Endereço: </strong>{{ contact.contact.address }}</p>
                </div>
                <div class="img">
                    <img src="../assets/img/contact.png" alt="contact" />
                </div>
            </div>
        </div>
    </AppearTransition>
</template>

<script setup>
import { ref } from 'vue';
import { useFetchDataStore } from '@/stores/fetchData.js'
import Loader from '@/components/Loader.vue'
import TypeTransition from '@/components/transitions/TypeTransition.vue';
import AppearTransition from '@/components/transitions/AppearTransition.vue';

const api = useFetchDataStore();
const contact = await api.fetchData('/contact');
</script>

<style lang="scss">
:root {
    --img-width: 500px;
}

.contact {
    .contact-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .info {
            margin-top: 40px;
            padding: 60px;
            background-color: var(--white-color);
            border-radius: var(--border-radius);
            margin-right: 50px;
            width: calc(100% - var(--img-width) - 50px);
            p {
                margin-bottom: 20px;
                &:last-child {
                    margin-bottom: 0;
                }
                &::before {
                    content: '';
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    background-color: var(--primary-color);
                    border-radius: 50%;
                    margin-right: 10px;
                }
                &:nth-child(2) {
                    &::before {
                        background-color: var(--highlight-color);
                    }
                }
                &:nth-child(3) {
                    &::before {
                        background-color: var(--secondary-color);
                    }
                }
            }
        }
        .img {
            width: var(--img-width);
            img {
                width: 100%;
                height: auto;
            }
        }
    }
}
</style>