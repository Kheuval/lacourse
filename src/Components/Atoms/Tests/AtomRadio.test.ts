import { mount } from "@vue/test-utils";
import { expect, test, vitest } from "vitest";
import AtomRadio from "../AtomRadio.vue";

test("mount component", () => {
  const wrapper = mount(AtomRadio, {
    props: {
      id: "edible",
      name: "edible",
      value: true,
      label: "Comestible",
    },
  });

  const label = wrapper.get("label");
  const input = wrapper.get("input");

  expect(label.attributes("for")).toBe("edible");
  expect(label.html()).toContain("Comestible");
  expect(input.attributes("id")).toBe("edible");
  expect(input.attributes("name")).toBe("edible");
  expect(input.attributes("value")).toBe("true");
});

test("mount fails", () => {
  const spy = vitest.spyOn(global.console, "warn").mockImplementation(() => {});
  mount(AtomRadio);

  expect(spy).toHaveBeenCalled();
  expect(spy.mock.calls[0][0]).toContain("[Vue warn]: Missing required prop");
});

test("emit update event", async () => {
  const wrapper = mount(AtomRadio, {
    props: {
      id: "edible",
      name: "edible",
      value: false,
      label: "Comestible",
    },
  });

  const input = wrapper.get("input");
  await input.trigger("click");
  const updateEvent = wrapper.emitted("update");

  expect(input.attributes("value")).toBe("false");
  expect(updateEvent).toBeTruthy();
  expect(updateEvent).toHaveLength(1);
  expect(updateEvent![0]).toEqual([false]);
});
