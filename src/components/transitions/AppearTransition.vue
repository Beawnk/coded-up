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

@for $i from 1 through 10 {
  .agent-#{$i} {
    opacity: 0;
    @include v.animation('appear ease 0.5s forwards');
    animation-delay: #{($i - 1) * 0.5}s;
  }
}


</style>