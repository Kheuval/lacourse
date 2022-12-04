<template>
  <div class="absolute left-[40%]" v-if="show" ref="spinner">
    <AtomSpinner class="absolute z-10 text-white top-[40%] left-[40%]" />
  </div>
  <AtomOverlay :show="show" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import AtomOverlay from "../Atoms/AtomOverlay.vue";
import AtomSpinner from "../Atoms/AtomSpinner.vue";

const spinner = ref<HTMLDivElement | null>(null);

const show = ref(false);

onMounted(() => {
  show.value = true;
  setTimeout(() => {
    spinner.value!.style.top = window.scrollY + window.innerHeight / 2 + "px";
  }, 1);
});
</script>

<style lang="scss" scoped></style>
