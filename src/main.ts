import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/Core/Router/index";
import "@/assets/styles.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCheckCircle,
  faBars,
  faCircleXmark,
  faTrashCan,
  faChevronLeft,
  faMagnifyingGlass,
  faPen,
  faCircleExclamation,
  faCircleArrowDown,
  faEye,
  faEyeSlash,
  faCartShopping,
  faHeart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";

library.add(
  faCheckCircle,
  faBars,
  faCircleXmark,
  faTrashCan,
  faChevronLeft,
  faMagnifyingGlass,
  faPen,
  faCircleExclamation,
  faCircleArrowDown,
  faImage,
  faEye,
  faEyeSlash,
  faCartShopping,
  faHeart,
  faMinus,
  faPlus
);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(createPinia());
app.use(router);

app.mount("#app");
