<template>
  <OrganismHeader :withMenu="false" :withViewHeader="false" />
  <main>
    <AtomTitle tag="h2" class="text-center text-xl mt-6">
      Connectez-vous pour commencer à faire vos courses !</AtomTitle
    >
    <OrganismLoginForm class="mt-10" />
    <AtomLink to="/reset-password" class="text-center text-secondary mt-8">
      Mot de passe oublié ?
    </AtomLink>
    <AtomTitle tag="h2" class="text-center text-xl mt-6"
      >Pas encore de compte ? Inscrivez-vous pour simplifier la gestion de vos
      courses au quotidien</AtomTitle
    >
    <AtomIcon
      icon="fa-solid fa-circle-down"
      class="block mx-auto mt-10 text-[4rem] text-secondary"
    />
    <OrganismHeader :home="true" class="mt-10" id="registerForm" />
    <OrganismRegisterForm class="mt-10" />
    <AtomTitle
      tag="h2"
      content="Découvrez La Course !"
      class="text-2xl text-center mt-10"
    >
      Découvrez <strong class="text-secondary">La Course</strong> !</AtomTitle
    >
    <OrganismHeader :home="true" class="mt-10" />
    <AtomTitle tag="h3" class="text-2xl text-center mt-10">
      <strong class="text-secondary">La Course</strong> est faite pour vous
      simplifier la vie !
    </AtomTitle>
    <AtomText class="text-lg mt-8">
      Recherchez parmi de
      <strong class="text-secondary">nombreuses</strong> recettes pour composer
      vos menus selon vos goûts.
    </AtomText>
    <AtomText class="text-lg mt-6">
      Préparez vos menus à l'avance pour ne plus avoir à vous poser la question
      "<strong class="text-secondary">On mange quoi ce soir ?</strong>".
    </AtomText>
    <AtomText class="text-lg mt-6">
      Grâce à <strong class="text-secondary">La Course</strong> vous pouvez
      composer vos menus directement et
      <strong class="text-secondary">une liste de courses</strong>
      personnalisable sera générée automatiquement pour vous.
    </AtomText>
    <AtomText class="text-lg mt-6">
      Avec <strong class="text-secondary">La Course</strong> vous pourrez aussi
      enregistrer vos <strong class="text-secondary">propres recettes</strong>,
      qu'elles viennent du livre de mamie ou de votre incroyable savoir-faire !
    </AtomText>
    <AtomText class="text-lg mt-6">
      Enfin, si vous souhaitez conserver vos habitudes vous pouvez très bien
      n'utiliser <strong class="text-secondary">La Course</strong> que pour
      écrire votre liste de courses et ainsi vous passer du papier et du stylo
      qu'on oublie tout le temps une fois en magasin !
    </AtomText>
    <AtomTitle
      tag="h1"
      class="text-3xl text-center my-10 border rounded-xl py-3 px-2 border-primary"
    >
      Alors n'attendez plus et
      <strong class="text-secondary">inscrivez-vous</strong> !
    </AtomTitle>
  </main>
</template>

<script lang="ts" setup>
import AtomIcon from "@/Components/Atoms/AtomIcon.vue";
import AtomLink from "@/Components/Atoms/AtomLink.vue";
import AtomText from "@/Components/Atoms/AtomText.vue";
import AtomTitle from "@/Components/Atoms/AtomTitle.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import OrganismLoginForm from "@/Components/Organisms/OrganismLoginForm/OrganismLoginForm.vue";
import OrganismRegisterForm from "@/Components/Organisms/OrganismRegisterForm/OrganismRegisterForm.vue";
</script>
