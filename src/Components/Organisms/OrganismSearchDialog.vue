<template>
  <AtomButton
    class="flex items-center rounded-full px-6 py-3 bg-primary text-white mb-2"
  >
    Rechercher une recette
    <AtomIcon
      class="text-xl text-white ml-4"
      icon="fa-solid fa-magnifying-glass"
    />
  </AtomButton>
</template>

<script lang="ts" setup>
import AtomButton from "@/Components/Atoms/AtomButton.vue";
import AtomIcon from "@/Components/Atoms/AtomIcon.vue";
</script>
