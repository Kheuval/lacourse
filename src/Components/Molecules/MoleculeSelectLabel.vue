<template>
  <div class="relative inline-block">
    <AtomSelect
      :id="id"
      :name="name"
      :options="options"
      @change="(content) => $emit('change', content)"
      :defaultValue="defaultValue"
    />
    <AtomLabel :id="id" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts" setup>
import AtomLabel from "../Atoms/AtomLabel.vue";
import AtomSelect from "../Atoms/AtomSelect/AtomSelect.vue";
import type { IngredientOption } from "../Atoms/AtomSelect/IngredientOptionInterface";

defineEmits(["change"]);

withDefaults(
  defineProps<{
    id: string;
    placeholder: string;
    name: string;
    options: IngredientOption[];
    defaultValue?: string;
  }>(),
  {
    defaultValue: "",
  }
);
</script>

<style lang="scss" scoped></style>
