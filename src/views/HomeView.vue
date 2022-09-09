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

<script setup>
import { ref } from "vue";

const login = ref("");
const password = ref("");
const loginRegister = ref("");
const emailRegister = ref("");
const pwdRegister1 = ref("");
const pwdRegister2 = ref("");
</script>

<style lang="scss" scoped>
.headerMini {
  text-align: center;
  margin-bottom: 3.5vh;
  min-height: 20vh;

  @media (min-width: 600px) {
    margin: 3.5vh auto;
  }

  .headerLogo {
    width: 28vw;

    @media (min-width: 600px) {
      width: 20vw;
    }
  }

  .headerTitle {
    font-family: "Exo 2", sans-serif;
    font-size: 3rem;
    font-weight: 600;
    color: $secondary;

    @media (min-width: 600px) {
      font-size: 5rem;
    }
  }
}

.wrapperHeight {
  min-height: 80vh;

  @media (min-width: 600px) {
    min-height: auto;
  }
}

.contentWrapper {
  padding: 0 5%;

  h3 {
    margin-bottom: 4rem;
  }

  p {
    margin-bottom: 2rem;
  }
}

.formAccount {
  margin-top: 3.5vh;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;

  form {
    width: 100%;
    margin-bottom: 4.5vh;

    .inputText {
      width: 80%;
      height: 4.8rem;
      margin-bottom: 3.75vh;
      border: 1px solid $primary;
      border-radius: 18px;
      padding-left: 2.25vw;
      color: $secondary;
      font-family: "Lexend Deca", sans-serif;
      font-weight: bold;
      background-image: none;

      @media (min-width: 600px) {
        height: 6rem;
        font-size: 1.8rem;
      }

      &::placeholder {
        opacity: 1;
      }
    }

    .submitButton {
      border: none;
      width: 60%;
      height: 2.85rem;
      border-radius: 10px;
      background-color: $primary;
      font-family: "Lexend Deca", sans-serif;
      text-transform: uppercase;
      color: white;
      font-weight: bold;
      cursor: pointer;

      @media (min-width: 600px) {
        height: 4rem;
      }
    }
  }

  .forgottenPwd {
    text-decoration: none;
    color: $secondary;
    font-weight: bold;
    margin-bottom: 3vh;
    font-size: 1.2rem;
  }
}

.arrowDown {
  display: block;
  width: 6rem;
  max-height: 10rem;
  margin: 2rem auto;
  background-color: $secondary;
  border-radius: 50%;

  i {
    font-size: 6.1rem;
    color: $primary;
  }

  @media (min-width: 600px) {
    display: none;
  }
}

#homePage2 {
  @media (min-width: 600px) {
    display: none;
  }
}

.register {
  color: $primary;
  text-align: center;
  font-size: 1.3rem;
  margin: 5rem 0;
  padding: 3%;
  border-radius: 30px;
  border: 1px solid $primary;

  @media (min-width: 600px) {
    margin-top: 10rem;
  }
}
</style>
