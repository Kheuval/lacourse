<template>
  <div class="relative mb-5 inline-block">
    <AtomInput
      :id="id"
      :type="type"
      :validationRules="validationRules"
      :typeNumber="typeNumber"
      :defaultContent="defaultContent"
      @update="(content) => $emit('update', content)"
    />
    <AtomLabel :id="id" :placeholder="placeholder" />
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from "@/Core/Services/Validation/ValidationInterface";
import AtomInput from "../Atoms/AtomInput.vue";
import AtomLabel from "../Atoms/AtomLabel.vue";

withDefaults(
  defineProps<{
    id: string;
    type: string;
    placeholder: string;
    validationRules?: Rule[];
    typeNumber?: boolean;
    defaultContent?: string | number;
  }>(),
  {
    typeNumber: false,
    defaultContent: "",
  }
);

defineEmits(["update"]);
</script>
