<template>
  <div class="min-w-full inline-block min-h-[15rem] relative">
    <AtomImage
      :src="src"
      :alt="alt"
      class="h-full w-full aspect-[3/2] object-cover"
    />
    <AtomLink :to="route">
      <div
        class="h-full w-full absolute top-0 rounded-3xl bg-black bg-opacity-50 flex items-center justify-center"
      >
        <span class="text-white text-3xl text-center">{{ alt }}</span>
      </div>
    </AtomLink>
  </div>
</template>

<script lang="ts" setup>
import { DataProviderKey } from "@/Core/Config/DataProviderInterface";
import { inject } from "vue";
import AtomImage from "../Atoms/AtomImage.vue";
import AtomLink from "../Atoms/AtomLink.vue";

const { mediaObjectProvider } = inject(DataProviderKey)!;

const props = defineProps<{
  imageIri: string;
  alt: string;
  resourceId: string;
}>();

const src =
  import.meta.env.APP_API_URL +
  (await mediaObjectProvider.findOneByIri(props.imageIri));

const route = "/recipes/show/" + props.resourceId.match(/\d+/)![0];
</script>
