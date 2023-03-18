<template>
  <textarea
    class="resize-none h-full rounded-3xl pt-12 px-4 text-primary focus:outline-none focus:ring-4 focus:ring-secondary"
    :id="id"
    v-model="content"
    @change="$emit('update', content)"
  >
  </textarea>
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineEmits(["update"]);

const props = withDefaults(
  defineProps<{
    id: string;
    defaultContent?: string;
  }>(),
  {
    defaultContent: "",
  }
);

const content = ref(props.defaultContent || "");
</script>

<style lang="scss" scoped></style>
