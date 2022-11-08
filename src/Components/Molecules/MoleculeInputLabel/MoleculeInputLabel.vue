<template>
  <div class="relative mb-4 inline-block">
    <AtomInput
      :id="id"
      :type="type"
      :validationRules="validationRules"
      @update="(content) => $emit('update', content)"
    />
    <AtomLabel :id="id" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from "@/Core/Services/Validation/RuleType";
import AtomInput from "../../Atoms/AtomInput.vue";
import AtomLabel from "../../Atoms/AtomLabel.vue";

defineProps<{
  id: string;
  type: string;
  placeholder: string;
  validationRules?: Rule[];
}>();
</script>

<style lang="scss" scoped></style>
