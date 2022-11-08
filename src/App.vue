<template>
  <!-- <OrganismRegisterForm /> -->
  <AtomInput id="test" type="text" :validationRules="validationRules" />
  <!-- <RouterView /> -->
</template>

<script setup lang="ts">
import { databaseAuthService } from "./Core/Services/Auth/DatabaseAuthService";
import OrganismRegisterForm from "./Components/Organisms/OrganismRegisterForm/OrganismRegisterForm.vue";
import AtomInput from "./Components/Atoms/AtomInput.vue";
import { useRuleStore } from "./Core/Services/Validation/RuleStore";
import { ref } from "vue";

const rules = useRuleStore();
const validationRules = ref([]);

rules.checkPasswords.rule('toto')

const links = [
  {
    to: "/user/profile",
    content: "Mon profil",
  },
  {
    to: "/user/lists",
    content: "Mes listes de courses",
  },
  {
    to: "/user/recipes",
    content: "Mes recettes",
  },
  {
    to: "/user/favorites",
    content: "Mes favoris",
  },
  {
    to: "/",
    content: "Se déconnecter",
    click: () => databaseAuthService.logout(),
  },
];
</script>
<style lang="scss" scoped></style>
