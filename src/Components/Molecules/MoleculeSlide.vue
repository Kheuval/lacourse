<template>
  <div class="min-w-full inline-block min-h-[15rem] relative">
    <AtomImage
      :src="src"
      :alt="alt"
      class="h-full w-full aspect-[3/2] object-cover"
    />
    <AtomLink :to="alt">
      <div
        class="h-full w-full absolute top-0 rounded-3xl bg-black bg-opacity-50 flex items-center justify-center"
      >
        <span class="text-white text-3xl text-center">{{ alt }}</span>
      </div>
    </AtomLink>
  </div>
</template>

<script lang="ts" setup>
import { databaseMediaObjectRepository } from "@/Domain/MediaObject/Repository/DatabaseMediaObjectRepository";
import { ref } from "vue";
import AtomImage from "../Atoms/AtomImage.vue";
import AtomLink from "../Atoms/AtomLink.vue";

const props = defineProps<{
  imageIri: string;
  alt: string;
  resourceId: number;
}>();

const src = ref("");

databaseMediaObjectRepository
  .findOneByIri(props.imageIri)
  .then(
    (mediaObject) =>
      (src.value = import.meta.env.APP_PUBLIC_API_URL + mediaObject!.contentUrl)
  );
</script>

<style lang="scss" scoped></style>
