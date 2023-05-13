import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import AtomText from "../AtomText.vue";

test("mount component with slot", () => {
  const wrapper = mount(AtomText, {
    slots: {
      default: "Bonjour",
    },
  });

  expect(wrapper.get("p").html()).toContain("Bonjour");
});
