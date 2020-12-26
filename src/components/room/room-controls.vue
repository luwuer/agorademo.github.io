<template>
  <div class="room-controls">
    <div class="control-item">
      <span class="icon-wrapper" @click="toogleMic">
        <icon name="icon-mic" />
        <span v-show="!micEnabled" class="hack-ban"></span>
      </span>
      <span class="icon-des">音频</span>
    </div>

    <div class="control-item">
      <span class="icon-wrapper" @click="toogleCamera">
        <icon name="icon-video" />
        <span v-show="!cameraEnabled" class="hack-ban"></span>
      </span>
      <span class="icon-des">视频</span>
    </div>
  </div>
</template>

<script lang="ts">
import Agora from "@/assets/common/Agora";
import store from "@/store";
import { computed, defineComponent } from "vue";
import Icon from "../icon.vue";

export default defineComponent({
  name: "room-controls",
  components: {
    Icon
  },
  setup() {
    const agora: Agora | null = window.agora;
    const micEnabled = computed(() => store.state.micEnabled);
    const cameraEnabled = computed(() => store.state.cameraEnabled);

    // 初始化控制器状态
    async function initStatus() {
      if (!agora) return;

      const micTrack = agora.micTrack;
      const micTrackReady = agora.micTrackReady;
      if (micTrackReady) {
        await micTrackReady;
        store.commit("setMicEnabled", (micTrack as any)._enabled);
      }

      const cameraTrack = agora.cameraTrack;
      const cameraTrackReady = agora.cameraTrackReady;
      if (cameraTrackReady) {
        store.commit("setCameraEnabled", (cameraTrack as any)._enabled);
      }
    }

    // 切换麦克风状态
    async function toogleMic() {
      if (micEnabled.value) {
        agora?.closeMicTrack();
      } else {
        agora?.createMicTrack();
      }

      store.commit("setMicEnabled", !micEnabled.value);
    }

    // 切换摄像头状态
    async function toogleCamera() {
      if (cameraEnabled.value) {
        agora?.closeCameraTrack();
      } else {
        const local = document.getElementById("local");
        local && agora?.createCameraTrack(local);
      }

      store.commit("setCameraEnabled", !cameraEnabled.value);
    }

    initStatus();

    return {
      micEnabled,
      cameraEnabled,
      toogleMic,
      toogleCamera
    };
  }
});
</script>

<style lang="stylus">
@import '~@/assets/style/vars.styl'

.room-controls {
  position absolute
  bottom 0
  display flex
  width auto
  height 3.2rem
  padding 0.3rem 1rem 0.4rem
  background-color $half-transparent
  border-radius 1rem 1rem 0 0
  box-shadow 0 2px 2px 0 rgba(77, 77, 77 0.14), 0 3px 1px -2px rgba(77, 77, 77 0.12), 0 1px 5px 0 rgba(77, 77, 77 0.2)

  .control-item {
    display flex
    flex-direction column

    .icon-wrapper {
      position relative
      display flex
      align-items center
      justify-content center
      width 2.4rem
      height 2.4rem
      margin 0 0.2rem
      border-radius 1.2rem
      font-size 1.6rem
      color $primary
      cursor pointer

      &:hover {
        color $hover
        background-color #4441
        box-shadow 0 0 0 0.1rem #4441
      }

      .hack-ban {
        position absolute
        left 0
        top 0
        width 100%
        height 100%
        background-color transparent

        &::after {
          content ''
          position absolute
          top 1.2rem
          left 0.4rem
          width 1.6rem
          border-top 2px solid red
          transform rotate(-56deg)
        }

        &:hover::after {
          content ''
          position absolute
          top 1.2rem
          left 0.4rem
          width 1.6rem
          border-top 2px solid $hover
          transform rotate(-56deg)
        }

        &:active::after {
          content ''
          position absolute
          top 1.2rem
          left 0.4rem
          width 1.6rem
          border-top 2px solid transparent
          transform rotate(-56deg)
        }
      }
    }

    .icon-des {
      font-size 0.6rem
    }
  }
}
</style>
