<template>
  <div class="flex items-center justify-center">
    <AtomLink :to="previousRoute" class="mr-auto">
      <AtomIcon icon="fa-solid fa-chevron-left" class="text-4xl" />
    </AtomLink>
    <AtomTitle tag="h2" class="text-2xl text-center mr-auto p-6">
      {{ title }}
    </AtomTitle>
    <slot name="resourceAction"></slot>
  </div>
</template>

<script lang="ts" setup>
import { useRouterStore } from "@/Core/Router/RouterStore";
import AtomIcon from "../Atoms/AtomIcon.vue";
import AtomLink from "../Atoms/AtomLink.vue";
import AtomTitle from "../Atoms/AtomTitle.vue";

const { navigationStack } = useRouterStore();

defineProps<{
  title: string;
}>();

const previousRoute = navigationStack.at(-1)!.fullPath;
</script>
