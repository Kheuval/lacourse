import type { RegisterForm } from "@/Components/Organisms/OrganismRegisterForm/RegisterFormInterface";
import mitt from "mitt";
import { defineStore } from "pinia";

type Events = {
  validate: RegisterForm;
};

export const useEventBus = defineStore("event", () => {
  const emitter = mitt<Events>();

  return { emitter };
});
