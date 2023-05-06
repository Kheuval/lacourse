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
import type {
  IngredientOption,
  ListOption,
} from "../Atoms/AtomSelect/OptionInterface";

defineEmits(["change"]);

withDefaults(
  defineProps<{
    id: string;
    placeholder: string;
    name: string;
    options: IngredientOption[] | ListOption[];
    defaultValue?: string;
  }>(),
  {
    defaultValue: "",
  }
);
</script>
