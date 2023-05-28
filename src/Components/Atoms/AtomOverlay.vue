<template>
  <Transition name="overlay">
    <div
      class="fixed z-10 bg-opacity-90 bg-black w-full h-full top-0 left-0 cursor-pointer"
      v-if="show"
      @click="hide"
    ></div>
  </Transition>
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue";

const props = defineProps<{
  show: boolean;
}>();

const emits = defineEmits(["click"]);

const hide = () => {
  document.getElementsByTagName("body")[0].classList.remove("overflow-hidden");
  emits("click");
};

watch(props, (newProps) => {
  const body = document.querySelector("body")!;
  if (newProps.show) {
    body.classList.add("overflow-hidden");
  } else {
    body.classList.remove("overflow-hidden");
  }
});

onMounted(() => {
  const body = document.querySelector("body")!;
  if (body.classList.contains("overflow-hidden")) {
    body.classList.remove("overflow-hidden");
  } else {
    body.classList.add("overflow-hidden");
  }
});
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
