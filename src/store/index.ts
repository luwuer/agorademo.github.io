import { createStore } from "vuex";
import Agora from "@/assets/common/Agora";

interface MyState {
  channel: string;
  agora: Agora | null;
  micEnabled: boolean;
  cameraEnabled: boolean;
}

export default createStore<MyState>({
  state: {
    channel: "",
    agora: null,
    micEnabled: true,
    cameraEnabled: true
  },
  mutations: {
    setChannel(state, value: string): void {
      state.channel = value;
    },
    setAgora(state, value: Agora): void {
      state.agora = value;
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
