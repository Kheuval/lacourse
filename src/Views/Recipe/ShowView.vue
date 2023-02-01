<template>
  <OrganismHeader />
  <MoleculeViewHeader class="mt-2" :title="resource!.name">
    <template #resourceAction v-if="isOwner">
      <AtomButton @click="toggleResourceActions">
        <AtomIcon icon="fa-solid fa-gear" class="text-2xl text-secondary" />
      </AtomButton>
      <MoleculeResourceAction
        v-if="showResourceActions"
        :resource="resource!"
      />
    </template>
  </MoleculeViewHeader>
  <AtomOverlay :show="showResourceActions" @click="toggleResourceActions" />
</template>

<script lang="ts" setup>
import AtomButton from "@/Components/Atoms/AtomButton.vue";
import AtomIcon from "@/Components/Atoms/AtomIcon.vue";
import AtomOverlay from "@/Components/Atoms/AtomOverlay.vue";
import MoleculeResourceAction from "@/Components/Molecules/MoleculeResourceAction.vue";
import MoleculeViewHeader from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";
import { useUserStore } from "@/Domain/User/Store/UserStore";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { currentUser } = useUserStore();

const resource = await databaseRecipeRepository.findOneByIri(
  "/api/recipes/" + route.params.id
);

const isOwner = currentUser?.username === resource?.user.username;

const showResourceActions = ref(false);

const toggleResourceActions = () =>
  (showResourceActions.value = !showResourceActions.value);
</script>

<style lang="scss" scoped></style>
