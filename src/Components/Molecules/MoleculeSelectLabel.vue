<template>
  <div class="relative mb-5 inline-block">
    <AtomSelect
      :id="id"
      :name="name"
      :options="options"
      @change="(content) => $emit('change', content)"
    />
    <AtomLabel :id="id" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts" setup>
import AtomLabel from "../Atoms/AtomLabel.vue";
import AtomSelect from "../Atoms/AtomSelect/AtomSelect.vue";
import type { IngredientOption } from "../Atoms/AtomSelect/IngredientOptionInterface";

defineEmits(["change"]);

defineProps<{
  id: string;
  placeholder: string;
  name: string;
  options: IngredientOption[];
}>();
</script>

<style lang="scss" scoped></style>
