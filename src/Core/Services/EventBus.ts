import mitt, { type Emitter, type EventType } from "mitt";
import { defineStore } from "pinia";

type Events = {
  validate: string;
};

export const useEventBus = defineStore("event", {
  state: (): Emitter<Record<EventType, unknown>> => mitt(),
});
