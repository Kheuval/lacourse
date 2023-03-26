import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import { router } from "@/Core/Router/index";
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
  faCircleDown,
  faEye,
  faEyeSlash,
  faCartShopping,
  faHeart,
  faMinus,
  faPlus,
  faGear,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { provide } from "./Core/Config/DataProvider";
import { databaseDataProvider } from "./Core/Config/DatabaseDataProvider";

library.add(
  faCheckCircle,
  faBars,
  faCircleXmark,
  faTrashCan,
  faChevronLeft,
  faMagnifyingGlass,
  faPen,
  faCircleExclamation,
  faCircleDown,
  faImage,
  faEye,
  faEyeSlash,
  faCartShopping,
  faHeart,
  faMinus,
  faPlus,
  faGear,
  faFloppyDisk
);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(createPinia());
app.use(router);
app.provide("dataProvider", provide(databaseDataProvider));

app.mount("#app");
