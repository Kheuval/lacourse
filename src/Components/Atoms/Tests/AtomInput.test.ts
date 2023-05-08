import { expect, test, vitest } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import AtomInput from "../AtomInput.vue";
import { NotNullRule } from "@/Core/Services/Validation/Rules/NotNullRule";
import { useEventBus } from "@/Core/Services/EventBus";

test("mount component", async () => {
  const wrapper = mount(AtomInput, {
    global: {
      plugins: [createTestingPinia()],
    },
    props: {
      id: "username",
      type: "text",
    },
  });

  const input = wrapper.get("input");

  expect(input.attributes("id")).toBe("username");
  expect(input.attributes("type")).toBe("text");
});

test("mount fails", () => {
  const spy = vitest.spyOn(global.console, "warn").mockImplementation(() => {});
  mount(AtomInput);

  expect(spy).toHaveBeenCalled();
  expect(spy.mock.calls[0][0]).toContain("[Vue warn]: Missing required prop");
});

test("emit update event", async () => {
  const wrapper = mount(AtomInput, {
    global: {
      plugins: [createTestingPinia()],
    },
    props: {
      id: "username",
      type: "text",
    },
  });

  await wrapper.get("input").setValue("Kheuval");

  expect(wrapper.emitted("update")).toBeTruthy();
});

test("error message is displayed", async () => {
  const wrapper = mount(AtomInput, {
    global: {
      plugins: [createTestingPinia()],
    },
    props: {
      id: "username",
      type: "text",
      validationRules: [new NotNullRule()],
    },
  });

  await wrapper.get("input").setValue("");

  expect(wrapper.get("p").text()).toBe("Ce champ ne peut pas être vide");
});

test.fails("error message is dismissed", async () => {
  const wrapper = mount(AtomInput, {
    global: {
      plugins: [createTestingPinia()],
    },
    props: {
      id: "username",
      type: "text",
      validationRules: [new NotNullRule()],
    },
  });

  const input = wrapper.get("input");
  await input.setValue("");
  await input.trigger("focus");

  wrapper.get("p");
});

test("listen to events input", () => {
  const wrapper = mount(AtomInput, {
    global: {
      plugins: [createTestingPinia()],
    },
    props: {
      id: "username",
      type: "text",
      validationRules: [new NotNullRule()],
    },
  });
  const { emitter } = useEventBus();

  emitter.emit("setInputContent", { id: "username", inputValue: "Kheuval" });
  emitter.emit("validate", "username");

  expect(wrapper.emitted("update")).toBeTruthy();
});
