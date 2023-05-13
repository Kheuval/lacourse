import { mount } from "@vue/test-utils";
import AtomOverlay from "../AtomOverlay.vue";
import { expect, test, vitest } from "vitest";

test("mount component", () => {
  const wrapper = mount(AtomOverlay, {
    props: {
      show: false,
    },
  });

  const transition = wrapper.get("transition-stub");

  expect(transition.attributes("name")).toBe("overlay");
});

test("mount fails", () => {
  const spy = vitest.spyOn(global.console, "warn").mockImplementation(() => {});
  mount(AtomOverlay);

  expect(spy).toHaveBeenCalled();
  expect(spy.mock.calls[0][0]).toContain("[Vue warn]: Missing required prop");
});

test("emit click event", async () => {
  const wrapper = mount(AtomOverlay, {
    props: {
      show: true,
    },
  });

  await wrapper.get("div").trigger("click");

  expect(wrapper.emitted()).toBeTruthy();
});
