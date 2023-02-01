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
  <AtomImage
    :src="src"
    :alt="resource!.name"
    class="rounded-3xl w-full aspect-[3/2] object-cover mt-4"
  />
  <MoleculeIconButton
    buttonClass="block mt-4 mx-auto px-8 py-4 rounded-full border-2 border-primary text-primary text-xl focus:outline-none"
    iconClass="text-secondary text-2xl"
    icon="fa-solid fa-cart-shopping"
    content="Ajouter à la liste"
  />

  <MoleculeIconButton
    buttonClass="block mt-4 mx-auto px-8 py-4 rounded-full border-2 border-primary text-primary text-xl focus:outline-none"
    iconClass="text-secondary text-2xl"
    icon="fa-solid fa-heart"
    content="Ajouter aux favoris"
  />
</template>

<script lang="ts" setup>
import AtomButton from "@/Components/Atoms/AtomButton.vue";
import AtomIcon from "@/Components/Atoms/AtomIcon.vue";
import AtomImage from "@/Components/Atoms/AtomImage.vue";
import AtomOverlay from "@/Components/Atoms/AtomOverlay.vue";
import MoleculeIconButton from "@/Components/Molecules/MoleculeIconButton.vue";
import MoleculeResourceAction from "@/Components/Molecules/MoleculeResourceAction.vue";
import MoleculeViewHeader from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import { databaseMediaObjectRepository } from "@/Domain/MediaObject/Repository/DatabaseMediaObjectRepository";
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

const src =
  import.meta.env.APP_API_URL +
  (await databaseMediaObjectRepository.findOneByIri(resource!.image));
</script>

<style lang="scss" scoped></style>
