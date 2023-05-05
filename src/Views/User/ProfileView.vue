<template>
  <OrganismHeader />
  <MoleculeViewHeader title="Mon profil" />
  <div class="flex flex-col gap-3 mt-4 items-center">
    <AtomTitle class="text-2xl" tag="h2">Identifiant :</AtomTitle>
    <AtomText class="text-secondary text-2xl">
      {{ currentUser?.username }}
    </AtomText>
    <AtomTitle class="text-2xl" tag="h2">Adresse e-mail :</AtomTitle>
    <AtomText class="text-secondary break-words text-xl">
      {{ currentUser?.email }}
    </AtomText>
  </div>
  <div class="flex flex-col gap-5 items-center my-8">
    <AtomLink to="/user/grocery-lists">
      <AtomButton class="uppercase bg-primary text-white rounded-xl px-6 py-2">
        Mes listes de course
      </AtomButton>
    </AtomLink>
    <AtomLink to="/user/recipes">
      <AtomButton class="uppercase bg-primary text-white rounded-xl px-6 py-2">
        Mes recettes
      </AtomButton>
    </AtomLink>
    <AtomLink to="/user/favorites">
      <AtomButton class="uppercase bg-primary text-white rounded-xl px-6 py-2">
        Mes favoris
      </AtomButton>
    </AtomLink>
    <AtomLink to="/reset-password">
      <AtomButton
        class="uppercase bg-secondary text-white rounded-xl px-4 py-2"
      >
        Réinitialiser mon mot de passe
      </AtomButton>
    </AtomLink>
  </div>
</template>

<script lang="ts" setup>
import AtomButton from "@/Components/Atoms/AtomButton.vue";
import AtomLink from "@/Components/Atoms/AtomLink.vue";
import AtomText from "@/Components/Atoms/AtomText.vue";
import AtomTitle from "@/Components/Atoms/AtomTitle.vue";
import MoleculeViewHeader from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import { useUserStore } from "@/Domain/User/Store/UserStore";

const { currentUser } = useUserStore();
</script>

<style lang="scss" scoped></style>
