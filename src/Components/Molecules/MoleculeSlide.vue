<template>
  <AtomImage
    :src="src"
    :alt="alt"
    class="object-cover aspect-[3/2] min-w-full"
  />
</template>

<script lang="ts" setup>
import { databaseMediaObjectRepository } from "@/Domain/MediaObject/Repository/DatabaseMediaObjectRepository";
import { ref } from "vue";
import AtomImage from "../Atoms/AtomImage.vue";

const props = defineProps<{
  imageIri: string;
  alt: string;
}>();

const src = ref(import.meta.env.APP_PUBLIC_API_URL);

databaseMediaObjectRepository
  .findOneByIri(props.imageIri)
  .then((mediaObject) => (src.value += mediaObject!.contentUrl));
</script>

<style lang="scss" scoped></style>
