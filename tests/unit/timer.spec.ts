import { shallowMount } from "@vue/test-utils";
import Timer from "@/components/timer.vue";
import { wait, nextFrame } from "../utils/index";

describe("Timer componnet", () => {
  it("initial", () => {
    const wrapper = shallowMount(Timer);
    expect(wrapper.text()).toEqual("00:00:00");
  });

  it("wait 3000ms", async () => {
    const wrapper = shallowMount(Timer);
    await wait(3000);
    await nextFrame();
    expect(wrapper.text()).toEqual("00:00:03");
  });
});
