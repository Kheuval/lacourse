<template>
  <OrganismHeader viewHeaderTitle="Édition de la liste" />
  <main>
    <OrganismGroceryListForm :groceryList="groceryList" class="mt-12" />
  </main>
</template>

<script lang="ts" setup>
import OrganismGroceryListForm from "@/Components/Organisms/OrganismGroceryListForm/OrganismGroceryListForm.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import { DataProviderKey } from "@/Core/Config/DataProviderInterface";
import { inject } from "vue";
import { useRoute } from "vue-router";

const { groceryListProvider } = inject(DataProviderKey)!;

const { params } = useRoute();

const groceryList = await groceryListProvider.findOneByIri(
  `/api/grocery_lists/${params.id}`
);
</script>
