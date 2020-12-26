import { createStore } from "vuex";

interface MyState {
  channel: string;
  micEnabled: boolean;
  cameraEnabled: boolean;
}

export default createStore<MyState>({
  state: {
    channel: "",
    micEnabled: true,
    cameraEnabled: true
  },
  mutations: {
    setChannel(state, value: string): void {
      state.channel = value;
    },
    setMicEnabled(state, value: boolean): void {
      state.micEnabled = value;
    },
    setCameraEnabled(state, value: boolean): void {
      state.cameraEnabled = value;
    }
  },
  actions: {},
  modules: {}
});
