<template>
  <Transition name="overlay">
    <div
      class="fixed bg-opacity-90 bg-black w-full h-full top-0 cursor-pointer"
      v-if="show"
      @click="$emit('click')"
    ></div>
  </Transition>
</template>

<script lang="ts" setup>
defineProps<{
  show: boolean;
}>();

defineEmits(["click"]);
</script>

<style lang="scss" scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
