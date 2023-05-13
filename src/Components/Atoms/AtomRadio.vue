<template>
  <div @click="$emit('update', value)">
    <label :for="id">{{ label }}</label>
    <input
      class="accent-secondary w-5"
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      :checked="checked"
    />
  </div>
</template>

<script lang="ts" setup>
defineEmits(["update"]);

defineProps<{
  id: string;
  name: string;
  value: any;
  label: string;
  checked?: boolean;
}>();
</script>
