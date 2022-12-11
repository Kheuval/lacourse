<template>
  <div
    class="snap-x snap-mandatory flex overflow-x-auto rounded-3xl scrollbar-hide bg-black scroll-smooth"
    ref="container"
  >
    <MoleculeSlide
      v-for="item in data"
      :key="item.id!"
      :imageIri="item.image"
      :alt="item.name"
      :resourceId="item.id!"
      class="snap-center"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import { onMounted, ref } from "vue";
import MoleculeSlide from "../Molecules/MoleculeSlide.vue";

const props = defineProps<{
  data: Recipe[] | null;
}>();

const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const slideWidth = container.value!.clientWidth;

  setInterval(() => {
    if (null === props.data) {
      return;
    }

    if (container.value!.scrollLeft === slideWidth * (props.data.length - 1)) {
      container.value!.scrollLeft = 0;
    } else {
      container.value!.scrollLeft += slideWidth;
    }
  }, 3000);
});
</script>

<style lang="scss" scoped></style>
