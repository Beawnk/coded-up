<template>
  <div class="loader"><span></span></div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use "@/assets/style/main.scss" as v;

@include v.keyframes(rotation) {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.loader {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: var(--shadow-color);
    span {
        width: 48px;
        height: 48px;
        border: 3px solid var(--primary-color);
        border-radius: 50%;
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        @include v.animation(rotation 1s linear infinite);
        &:before {
            content: '';  
            box-sizing: border-box;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: 3px solid transparent;
            border-bottom-color: var(--black-color);
        }
    }
}
</style>