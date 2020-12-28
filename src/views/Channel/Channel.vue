<template>
  <div class="one-to-one">
    <Room :name="name" :time="0">
      <div ref="video-container" id="videoContainer" class="video-container">
        <div ref="local" id="local" class="video-local video-item">
          <!-- <span v-show="isPlaying">我</span> -->
        </div>
      </div>
    </Room>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeUnmount, onMounted } from "vue";
import Room from "@/components/room/room.vue";
import store from "@/store";
import Agora from "@/assets/common/Agora";

export default defineComponent({
  name: "OneToOne",
  components: {
    Room
  },
  setup() {
    const agora: Agora | null = window.agora;

    onMounted(() => {
      nextTick(() => {
        if (agora) {
          // 直接使用 DOM API 规避无服务状态下 ctx 不识别的问题
          // const local = ctx.$refs["local"];
          // const container = ctx.$refs["ideo-wrapper"];
          const local = document.getElementById("local")!;
          const container = document.getElementById("videoContainer")!;
          agora.joinChannel(local, container);
        }
      });
    });

    onBeforeUnmount(() => {
      agora?.dispose();
      window.agora = null;
    });

    return {
      name: store.state.channel
    };
  }
});
</script>

<style lang="stylus">
@import '~@/assets/style/vars.styl'

.one-to-one {
  display flex
  align-items stretch
  width 100%

  .video-container {
    display flex
    flex-wrap wrap
    align-content flex-start
    width 100%
    padding 0.5rem 0
    overflow-y auto
    background-color $back-light
    box-shadow 0 2px 2px 0 rgba(77, 77, 77, 0.14), 0 3px 1px -2px rgba(77, 77, 77, 0.2), 0 1px 5px 0 rgba(77, 77, 77, 0.5)
    text-align left
    font-size 0

    &>div {
      display flex
      justify-content center
      align-items center
      flex-wrap wrap
      flex 0 1 21rem
      height 14rem
      margin 0.1rem
      font-size 1rem
      background-color $primary
      color $back
    }
  }
}
</style>
