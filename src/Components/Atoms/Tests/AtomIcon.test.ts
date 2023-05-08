import { expect, test, vitest } from "vitest";
import { mount } from "@vue/test-utils";
import AtomIcon from "../AtomIcon.vue";

test("mount component", async () => {
  const wrapper = mount(AtomIcon, {
    props: {
      icon: "fa-solid fa-trash-can",
    },
  });

  expect(wrapper.html()).toContain("fa-trash-can");
});

test("mount fails", () => {
  const spy = vitest.spyOn(global.console, "warn").mockImplementation(() => {});
  mount(AtomIcon);

  expect(spy).toHaveBeenCalled();
  expect(spy.mock.calls[0][0]).toContain("[Vue warn]: Missing required prop");
});
