<template>
  <AtomButton :class="buttonClass" @click="() => $emit('click')">
    {{ content }}
    <AtomIcon :icon="icon" :class="iconClass" />
  </AtomButton>
</template>

<script lang="ts" setup>
import AtomButton from "../Atoms/AtomButton.vue";
import AtomIcon from "../Atoms/AtomIcon.vue";

defineProps<{
  content: string;
  buttonClass?: string;
  iconClass?: string;
  icon: string;
}>();

defineEmits(["click"]);
</script>
