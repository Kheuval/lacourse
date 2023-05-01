<template>
  <div class="relative w-full">
    <select
      class="px-8 pb-3 pt-4 text-sm rounded-full border-2 border-primary text-primary focus:outline-none bg-white appearance-none cursor-pointer w-full"
      :name="name"
      :id="id"
      @change="$emit('change', ($event.target! as HTMLSelectElement).value)"
      :value="defaultValue"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <span
      class="absolute inline-block rotate-90 text-secondary text-2xl top-3 right-3"
    >
      >
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { IngredientOption, ListOption } from "./OptionInterface";

defineEmits(["change"]);

withDefaults(
  defineProps<{
    name: string;
    id: string;
    options: IngredientOption[] | ListOption[];
    defaultValue?: string;
  }>(),
  {
    defaultValue: (props) => props.options[0].value,
  }
);
</script>

<style lang="scss" scoped></style>
