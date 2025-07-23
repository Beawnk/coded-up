<template>
    <Loader v-if="loading" />
    <AppearTransition v-else>
        <div class="home" v-if="data">
            <TypeTransition>
                <h1 class="target-text agent-1">Bem-vindo a {{ data.title }}, sua Jornada para o Design e Desenvolvimento Full-stack.</h1>
            </TypeTransition>
            <div class="content">
                <p class="description agent-2">Você está prestes a embarcar em uma experiência de aprendizado que transformará sua visão sobre design e desenvolvimento. Na {{ data.title }}, oferecemos cursos online de alta qualidade focados em desenvolvimento full-stack e Design UX/UI, projetados para todos os níveis de habilidade, desde iniciantes até profissionais em busca de atualização.</p>
                <div class="explanation agent-3">
                    <div class="img">
                        <img src="../assets/img/coding.png" alt="Developer" />
                    </div>
                    <div class="inside-content">
                        <h4>Por que escolher nossa plataforma?</h4>
                        <div class="text">
                            <p><strong>Conteúdo Atualizado: </strong> Nossos cursos são elaborados por especialistas da indústria, abordando as últimas tendências e tecnologias.</p>
                            <p><strong>Metodologia Prática: </strong>Acreditamos que a melhor forma de aprender é fazendo. Por isso, nossos alunos têm acesso a projetos práticos que simulam desafios reais do mercado.</p>
                            <p><strong>Flexibilidade: </strong>Estude no seu ritmo, em qualquer lugar e a qualquer hora. Nossos cursos são 100% online, permitindo que você conecte teoria e prática de forma conveniente.</p>
                            <p><strong>Comunidade de Aprendizado: </strong>Junte-se a uma rede vibrante de estudantes e profissionais, onde você pode compartilhar experiências, tirar dúvidas e colaborar em projetos.</p>
                        </div>
                    </div>
                </div>
                <div class="will-learn agent-4">
                    <div class="img">
                        <img src="../assets/img/design-team.png" alt="Designer" />
                    </div>
                    <div class="inside-content">
                        <h4>O que você vai aprender?</h4>
                        <div class="text">
                            <p>Fundamentos do HTML, CSS, JavaScript e muito mais</p>
                            <p>Técnicas de Design Responsivo</p>
                            <p>Princípios de Design UX/UI para criar experiências envolventes</p>
                            <p>Ferramentas e softwares utilizados no setor</p>
                            <p>Melhores práticas para otimização e desempenho</p>
                        </div>
                        <p class="p-final">Prepare-se para dar o próximo passo na sua carreira! Explore nossos cursos e comece a sua jornada para se tornar um designer ou desenvolvedor de sucesso. Na {{ data.title }}, o futuro do design e desenvolvimento está a um clique de distância.</p>
                    </div>
                </div>
                <div class="reviews agent-5">
                    <h4>Depoimentos</h4>
                    <div class="grid">
                        <div class="review" v-for="review in data.reviews" :key="review.id">
                            <p>{{ review.description }}</p>
                            <p><strong>{{ review.name }}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppearTransition>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Loader from '@/components/Loader.vue'
import TypeTransition from '@/components/transitions/TypeTransition.vue';
import AppearTransition from '@/components/transitions/AppearTransition.vue';
import HomeData from '@/api/home.json';

const data = ref(HomeData);
const loading = ref(true);

onMounted(async () => {
    loading.value = false;
});

</script>

<style lang="scss" scoped>
@use '../assets/style/main.scss' as v;

.home {
    .type-content {
        margin-bottom: 30px;
    }
    .content {
        .explanation {
            margin-top: 40px;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            @include v.media(900px) {
                flex-direction: column;
            }
            .img {
                width: 700px;
                @include v.media(900px) {
                    width: 500px;
                }
                @include v.media(540px) {
                    width: 100%;
                }
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .inside-content {
                margin-right: 80px;
                @include v.media(900px) {
                    margin-right: 0;
                }
                .text {
                    margin: 20px 0;
                    background-color: var(--white-color);
                    padding: 30px;
                    border-radius: var(--border-radius);
                    h4 {
                        margin-bottom: 30px;
                    }
                    p {
                        margin-bottom: 20px;
                        &::before {
                            content: '';
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            background-color: var(--primary-color);
                            border-radius: 50%;
                            margin-right: 10px;
                        }
                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }
        .will-learn {
            display: flex;
            align-items: center;
            margin-top: 40px;
            margin-bottom: 40px;
            @include v.media(900px) {
                flex-direction: column;
            }
            .img {
                width: 700px;
                @include v.media(900px) {
                    width: 500px;
                }
                @include v.media(540px) {
                    width: 100%;
                }
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .inside-content {
                margin-left: 80px;
                @include v.media(900px) {
                    margin-left: 0;
                }
                .text {
                    padding: 30px;
                    border-radius: var(--border-radius);
                    background-color: var(--white-color);
                    margin: 20px 0;
                    h4 {
                        margin-bottom: 30px;
                    }
                    p {
                        margin-bottom: 20px;
                        &::before {
                            content: '';
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            background-color: var(--highlight-color);
                            border-radius: 50%;
                            margin-right: 10px;
                        }
                        &:last-child {
                            margin-bottom: 0;
                        }
                        &.p-final { 
                            margin-top: 40px;
                            &::before  {
                                content: none;
                            }
                        }
                    }
                }
            }
        }
        .reviews {
            margin-top: 40px;
            h4 {
                margin-bottom: 30px;
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                background-color: var(--white-color);
                padding: 20px;
                border-radius: var(--border-radius);
                @include v.media(540px) {
                    grid-template-columns: 1fr;
                }
                .review {
                    padding: 20px;
                    background-color: var(--primary-color);
                    border-radius: var(--border-radius);
                    p {
                        font-family: var(--ff-primary-light);
                        font-size: var(--text-medium);
                        &:last-child {
                            font-family: var(--ff-primary-semibold);
                        }
                    }
                }
            }
        }
    }
}
</style>