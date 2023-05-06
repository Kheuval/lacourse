<template>
  <div
    class="snap-x snap-mandatory flex overflow-x-auto rounded-3xl scrollbar-hide bg-black scroll-smooth"
    ref="container"
    @touchstart="stopSlider"
    @touchend="startSlider"
  >
    <MoleculeSlide
      class="snap-center"
      v-for="item in data"
      :key="item.id"
      :imageIri="item.image"
      :alt="item.name"
      :resourceId="item.id"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import { onMounted, onUnmounted, ref } from "vue";
import MoleculeSlide from "../Molecules/MoleculeSlide.vue";

const props = defineProps<{
  data: Recipe[] | null;
}>();

const container = ref<HTMLDivElement | null>(null);
const interval = ref<ReturnType<typeof setInterval> | undefined>(undefined);

const startSlider = () => {
  const slideWidth = container.value!.clientWidth;

  interval.value = setInterval(() => {
    if (null === props.data || null === container.value) {
      return;
    }

    if (container.value.scrollLeft === slideWidth * (props.data.length - 1)) {
      container.value.scrollLeft = 0;
    } else {
      container.value.scrollLeft += slideWidth;
    }
  }, 3000);
};

const stopSlider = () => {
  clearInterval(interval.value);
};

onMounted(() => {
  startSlider();
});

onUnmounted(() => {
  stopSlider();
});
</script>
