<template>
  <div class="relative mt-9 ml-9">
    <input
      :type="type"
      placeholder=""
      class="block px-2.5 pb-2.5 pt-4 text-sm rounded-full border-2 border-primary focus:border-secondary focus:outline-none peer bg-white"
      :id="id"
      @blur="$emit('update', content)"
      v-model="content"
    />
    <label
      :for="id"
      class="absolute text-md text-secondary duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
      >{{ placeholder }}</label
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from "vue";

defineProps<{
  id: string;
  type: string;
  placeholder: string;
}>();

defineEmits(["update"]);

const content: Ref<string> = ref("");
</script>

<style lang="scss" scoped></style>
