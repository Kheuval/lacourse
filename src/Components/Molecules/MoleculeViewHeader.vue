<template>
  <div class="flex items-center justify-center">
    <AtomLink :to="previousRoute" class="mr-auto">
      <AtomIcon icon="fa-solid fa-chevron-left" class="text-4xl" />
    </AtomLink>
    <AtomTitle tag="h2" class="text-2xl text-center mr-auto p-6">
      {{ title }}
    </AtomTitle>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AtomIcon from "../Atoms/AtomIcon.vue";
import AtomLink from "../Atoms/AtomLink.vue";
import AtomTitle from "../Atoms/AtomTitle.vue";

const router = useRouter();

defineProps<{
  title: string;
}>();

const previousRoute = ref(router.options.history.state.back!.toString());
</script>
