import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
// import router from "./router";

const app = createApp(App);

app.use(createPinia());
// app.use(router);

app.mount("#app");

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

registerServiceWorker();
