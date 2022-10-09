<template>
  <div class="container">
    <header class="headerMini">
      <img class="headerLogo" src="../assets/img/logo.svg" alt="Logo" />
      <h1 class="headerTitle">La Course</h1>
    </header>

    <main>
      <div class="wrapperHeight">
        <h2 class="subTitle19">
          Connectez-vous pour commencer à faire vos courses !
        </h2>
        <div class="formAccount">
          <form id="loginForm">
            <input
              class="inputText"
              type="text"
              name="log"
              placeholder="Identifiant"
              v-model="login"
            />
            <input
              class="inputText"
              type="password"
              name="pwd"
              placeholder="Mot de passe"
              v-model="password"
              v-on:keyup.enter="authenticate()"
            />
            <input
              class="submitButton"
              type="button"
              value="Connexion"
              @click="authenticate()"
            />
          </form>
          <router-link class="forgottenPwd" to="/forgotten-pwd"
            >Mot de passe oublié ?</router-link
          >
        </div>
        <h2 class="subTitle19">
          Pas encore de compte ? Inscrivez-vous pour simplifier la gestion de
          vos courses au quotidien
        </h2>
        <a class="arrowDown" href="#homePage2">
          <i class="fas fa-arrow-circle-down"></i>
        </a>
      </div>
      <div class="wrapperHeight">
        <div id="homePage2" class="headerMini">
          <img class="headerLogo" src="../assets/img/logo.svg" alt="Logo" />
          <h1 class="headerTitle">La Course</h1>
        </div>
        <div id="registerForm" class="formAccount">
          <form id="registerForm">
            <input
              class="inputText"
              type="text"
              name="logRegister"
              placeholder="Identifiant"
              v-model="loginRegister"
            />
            <input
              class="inputText"
              type="email"
              name="emailRegister"
              placeholder="Adresse email"
              v-model="emailRegister"
            />
            <input
              class="inputText"
              type="password"
              name="pwdRegister"
              placeholder="Mot de passe"
              v-model="pwdRegister1"
            />
            <input
              class="inputText"
              type="password"
              name="pwdRegister2"
              placeholder="Répéter le mot de passe"
              v-model="pwdRegister2"
            />
            <input
              class="submitButton"
              type="button"
              value="Créer un compte"
              @click="register()"
            />
          </form>
        </div>
        <h2 class="subTitle25">Découvrez <strong>La Course</strong> !</h2>
        <a class="arrowDown" href="#homePage3">
          <i class="fas fa-arrow-circle-down"></i>
        </a>
      </div>
      <div id="homePage3" class="wrapperHeight">
        <div class="headerMini">
          <img class="headerLogo" src="../assets/img/logo.svg" alt="Logo" />
        </div>
        <div class="contentWrapper">
          <h3 class="subTitle28">
            <strong>La Course</strong> est faite pour vous simplifier la vie !
          </h3>
          <p class="content19">
            Recherchez parmi de <strong>nombreuses</strong> recettes pour
            composer vos menus selon vos goûts.
          </p>
          <p class="content19">
            Préparez vos menus à l'avance pour ne plus avoir à vous poser la
            question "<strong>On mange quoi ce soir ?</strong>".
          </p>
          <p class="content19">
            Grâce à <strong>La Course</strong> vous pouvez composer vos menus
            directement et <strong>une liste de courses</strong> personnalisable
            sera générée automatiquement pour vous.
          </p>
          <p class="content19">
            Avec <strong>La Course</strong> vous pourrez aussi enregistrer vos
            <strong>propres recettes</strong>, qu'elles viennent du livre de
            mamie ou de votre incroyable savoir-faire !
          </p>
          <p class="content19">
            Enfin, si vous souhaitez conserver vos habitudes vous pouvez très
            bien n'utiliser <strong>La Course</strong> que pour écrire votre
            liste de courses et ainsi vous passer du papier et du stylo qu'on
            oublie tout le temps une fois en magasin !
          </p>
          <div class="register">
            <h1>Alors n'attendez plus et <strong>inscrivez-vous</strong> !</h1>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const login = ref("");
const password = ref("");
const loginRegister = ref("");
const emailRegister = ref("");
const pwdRegister1 = ref("");
const pwdRegister2 = ref("");
</script>
