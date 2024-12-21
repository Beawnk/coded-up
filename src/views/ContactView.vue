<template>
    <Loader v-if="loading" />
    <AppearTransition v-else>
        <div class="contact" v-if="data">
            <TypeTransition><h1 class="target-text agent-1">{{ data.title }}</h1></TypeTransition>
            <p class="agent-2">{{ data.description }}</p>
            <div class="contact-info agent-3">
                <div class="info">
                    <p><strong>Email: </strong>{{ data.contact.email }}</p>
                    <p><strong>Telefone: </strong>{{ data.contact.phone }}</p>
                    <p><strong>Endereço: </strong>{{ data.contact.address }}</p>
                </div>
                <div class="img">
                    <img src="../assets/img/contact.png" alt="contact" />
                </div>
            </div>
        </div>
    </AppearTransition>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import { supabase } from '@/lib/supabaseClient';
import Loader from '@/components/Loader.vue'
import TypeTransition from '@/components/transitions/TypeTransition.vue';
import AppearTransition from '@/components/transitions/AppearTransition.vue';

const loading = ref(false);
const data = ref(null);

const fetchData = async () => {
    loading.value = true;
    const { data: contactData, error } = await supabase.from('contact').select('*').single();
    if (error) {
        console.error('Error fetching contact:', error);
    } else {
        data.value = contactData;
        loading.value = false;
    }
};

onMounted(() => {
    fetchData();
});
</script>

<style lang="scss">
@use '../assets/style/main.scss' as v;

:root {
    --img-width: 500px;
}

@include v.media(900px) {
    :root {
        --img-width: 400px;
    }
}

@include v.media(540px) {
    :root {
        --img-width: 100%;
    }
}

.contact {
    .contact-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        @include v.media(900px) {
            flex-direction: column;
            align-items: center;
        }
        .info {
            margin-top: 40px;
            padding: 60px;
            background-color: var(--white-color);
            border-radius: var(--border-radius);
            margin-right: 50px;
            width: calc(100% - var(--img-width) - 50px);
            @include v.media(900px) {
                margin-right: 0;
                width: 100%;
                margin-bottom: 20px;
            }
            @include v.media(540px) {
                padding: 30px;
            }
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