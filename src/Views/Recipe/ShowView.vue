<template>
  <OrganismHeader :withViewHeader="false" />
  <MoleculeViewHeader class="mt-2" :title="recipe.name">
    <template #resourceAction v-if="isOwner">
      <AtomButton @click="toggleResourceActions">
        <AtomIcon icon="fa-solid fa-gear" class="text-2xl text-secondary" />
      </AtomButton>
      <MoleculeResourceAction v-if="showResourceActions" :resource="recipe" />
    </template>
  </MoleculeViewHeader>
  <main>
    <AtomOverlay :show="showResourceActions" @click="toggleResourceActions" />
    <AtomImage
      :src="src"
      :alt="recipe.name"
      class="rounded-3xl w-full aspect-[3/2] object-cover mt-4"
    />
    <div
      class="grid gap-2 grid-cols-2 grid-rows-2 items-center rounded-3xl border-2 border-primary text-sm text-center px-4 py-2 mt-4"
    >
      <AtomText>
        Préparation :
        <span class="text-secondary">
          {{ humanTime(recipe.preparationTime) }}
        </span>
      </AtomText>
      <AtomText>
        Cuisson :
        <span class="text-secondary">
          {{ humanTime(recipe.cookingTime) }}
        </span>
      </AtomText>
      <AtomText>
        Repos :
        <span class="text-secondary">
          {{ humanTime(recipe.restTime) }}
        </span>
      </AtomText>
      <AtomText>
        Temps total :
        <span class="text-secondary">
          {{ humanTime(recipe.totalTime) }}
        </span>
      </AtomText>
    </div>
    <AtomText class="text-center text-secondary mt-4">
      Pour {{ recipe.servings }} personnes
    </AtomText>
    <OrganismAddToListWidget :recipeIngredients="recipe.recipeIngredients" />
    <MoleculeIconButton
      buttonClass="block bg-secondary mt-4 mx-auto px-8 py-4 rounded-full text-white text-xl focus:outline-none"
      iconClass="text-white text-2xl"
      icon="fa-solid fa-heart"
      content="Retirer des favoris"
      v-if="isFavorite"
      @click="toggleFavoriteState"
    />
    <MoleculeIconButton
      buttonClass="block mt-4 mx-auto px-8 py-4 rounded-full border-2 border-secondary text-primary text-xl focus:outline-none"
      iconClass="text-secondary text-2xl"
      icon="fa-solid fa-heart"
      content="Ajouter aux favoris"
      v-else
      @click="toggleFavoriteState"
    />
    <MoleculeIngredientList
      class="mt-2"
      :recipeIngredients="recipe.recipeIngredients"
    />
    <MoleculeStepList :steps="recipe.steps" />
  </main>
</template>

<script lang="ts" setup>
import AtomButton from "@/Components/Atoms/AtomButton.vue";
import AtomIcon from "@/Components/Atoms/AtomIcon.vue";
import AtomImage from "@/Components/Atoms/AtomImage.vue";
import AtomOverlay from "@/Components/Atoms/AtomOverlay.vue";
import AtomText from "@/Components/Atoms/AtomText.vue";
import MoleculeIconButton from "@/Components/Molecules/MoleculeIconButton.vue";
import MoleculeIngredientList from "@/Components/Molecules/MoleculeIngredientList.vue";
import MoleculeResourceAction from "@/Components/Molecules/MoleculeResourceAction.vue";
import MoleculeStepList from "@/Components/Molecules/MoleculeStepList.vue";
import MoleculeViewHeader from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismAddToListWidget from "@/Components/Organisms/OrganismAddToListWidget.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import { DataProviderKey } from "@/Core/Config/DataProviderInterface";
import { useUserStore } from "@/Domain/User/Store/UserStore";
import { inject, ref } from "vue";
import { useRoute } from "vue-router";

const { mediaObjectProvider, recipeProvider, userProvider } =
  inject(DataProviderKey)!;

const route = useRoute();

const { currentUser } = useUserStore();

const recipe = await recipeProvider.findOneByIri(
  "/api/recipes/" + route.params.id
);

const favorites = ref(await userProvider.getFavorites(currentUser!.id));

const isFavorite = ref(
  !!favorites.value.filter((favorite) => favorite.id === recipe.id).length
);

const isOwner = currentUser?.username === recipe.user.username;

const showResourceActions = ref(false);

const toggleResourceActions = () =>
  (showResourceActions.value = !showResourceActions.value);

const src =
  import.meta.env.APP_API_URL +
  (await mediaObjectProvider.findOneByIri(recipe.image));

const humanTime = (time: number): string => {
  if (time === 0) {
    return "/";
  }
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours > 0 ? `${hours}h` : ""}${minutes > 0 ? `${minutes}min` : ""}`;
};

const toggleFavoriteState = async () => {
  let newFavorites: string[] = [];

  favorites.value.forEach((favorite) => {
    newFavorites.push(favorite.id);
  });

  if (isFavorite.value) {
    newFavorites = newFavorites.filter((favorite) => favorite !== recipe.id);
    favorites.value = favorites.value.filter(
      (favorite) => favorite.id !== recipe.id
    );
  } else {
    newFavorites.push(recipe.id);
    favorites.value.push(recipe);
  }

  isFavorite.value = !isFavorite.value;

  await userProvider.updateOneByIri(currentUser!.id, {
    favorites: newFavorites,
  });
};
</script>
