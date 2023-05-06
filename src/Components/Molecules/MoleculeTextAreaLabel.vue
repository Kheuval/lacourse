<template>
  <div class="relative mb-5 inline-block h-3/4">
    <AtomTextArea
      :id="id"
      :defaultContent="defaultContent"
      @update="(content) => $emit('update', content)"
    />
    <AtomLabel class="text-center" :id="id" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts" setup>
import AtomLabel from "../Atoms/AtomLabel.vue";
import AtomTextArea from "../Atoms/AtomTextArea.vue";

defineEmits(["update"]);

withDefaults(
  defineProps<{
    id: string;
    placeholder: string;
    defaultContent?: string;
  }>(),
  {
    defaultContent: "",
  }
);
</script>
