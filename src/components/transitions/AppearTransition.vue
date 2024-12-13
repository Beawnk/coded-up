<template>
  <Transition name="appear" appear>
    <slot></slot>
  </Transition>
</template>

<script setup>

</script>

<style lang="scss">
@use "@/assets/style/main.scss" as v;

@include v.keyframes('appear') {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.agent-1 {
  opacity: 0;
  @include v.animation('appear ease 0.5s forwards');
}

.agent-2 {
  opacity: 0;
  @include v.animation('appear ease 0.5s forwards');
  animation-delay: 0.5s;
}


</style>