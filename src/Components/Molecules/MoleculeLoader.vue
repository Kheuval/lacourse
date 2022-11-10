<template>
  <AtomSpinner
    class="absolute z-10 text-white top-[40%] left-[40%]"
    :show="show"
  />
  <AtomOverlay :show="show" />
</template>

<script lang="ts" setup>
import AtomOverlay from "../Atoms/AtomOverlay.vue";
import AtomSpinner from "../Atoms/AtomSpinner.vue";

defineProps<{
  show: boolean;
}>();
</script>

<style lang="scss" scoped></style>
