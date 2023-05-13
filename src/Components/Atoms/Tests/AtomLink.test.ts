import { expect, test, vitest } from "vitest";
import { mount } from "@vue/test-utils";
import AtomLink from "../AtomLink.vue";
import { router } from "@/Core/Router/index";
import { createTestingPinia } from "@pinia/testing";

test("mount component with a slot", () => {
  const wrapper = mount(AtomLink, {
    props: {
      to: "/",
    },
    slots: {
      default: "Homepage",
    },
  });

  const routerLink = wrapper.get("RouterLink");

  expect(routerLink.html()).toContain("Homepage");
  expect(routerLink.attributes("to")).toBe("/");
});

test("mount fails", () => {
  const spy = vitest.spyOn(global.console, "warn").mockImplementation(() => {});
  mount(AtomLink);

  expect(spy).toHaveBeenCalled();
  expect(spy.mock.calls[0][0]).toContain("[Vue warn]: Missing required prop");
});

test("emit click event", async () => {
  const wrapper = mount(AtomLink);

  await wrapper.get("RouterLink").trigger("click");

  expect(wrapper.emitted("click")).toBeTruthy();
});

test("navigate to homepage", async () => {
  const wrapper = mount(AtomLink, {
    global: {
      plugins: [createTestingPinia(), router],
    },
    props: {
      to: "/",
    },
    slots: {
      default: "Homepage",
    },
  });

  const push = vitest.spyOn(router, "push");
  const link = wrapper.get("a");
  await link.trigger("click");

  expect(push).toHaveBeenCalledTimes(1);
  expect(push).toHaveBeenCalledWith("/");
});
