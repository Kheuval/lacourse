<template>
  <OrganismHeader />
  <AtomTitle tag="h1" class="text-center text-2xl mt-8">
    Bonjour
    <em class="text-secondary not-italic">{{ currentUser!.username }}</em
    >, voici quelques idées de recettes
  </AtomTitle>
</template>

<script lang="ts" setup>
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import AtomTitle from "@/Components/Atoms/AtomTitle.vue";
import { useUserStore } from "@/Domain/User/Store/UserStore";

const { currentUser } = useUserStore();
</script>

<style lang="scss" scoped></style>
