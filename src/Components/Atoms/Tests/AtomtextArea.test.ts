import { mount } from "@vue/test-utils";
import { expect, test, vitest } from "vitest";
import AtomTextArea from "../AtomTextArea.vue";

test("mount component with default content", () => {
  const wrapper = mount(AtomTextArea, {
    props: {
      id: "step",
      defaultContent: "Hachez les oignons",
    },
  });

  const textarea = wrapper.get("textarea");

  expect(textarea.element.value).toBe("Hachez les oignons");
});

test("mount fails", () => {
  const spy = vitest.spyOn(global.console, "warn").mockImplementation(() => {});
  mount(AtomTextArea);

  expect(spy).toHaveBeenCalled();
  expect(spy.mock.calls[0][0]).toContain("[Vue warn]: Missing required prop");
});

test("emit update event", async () => {
  const wrapper = mount(AtomTextArea, {
    props: {
      id: "step",
      defaultContent: "Hachez les oignons",
    },
  });

  const textarea = wrapper.get("textarea");
  await textarea.setValue("Émincez les oignons");
  const updateEvent = wrapper.emitted("update");

  expect(textarea.element.value).toBe("Émincez les oignons");
  expect(updateEvent).toBeTruthy();
  expect(updateEvent).toHaveLength(1);
  expect(updateEvent![0]).toEqual(["Émincez les oignons"]);
});
