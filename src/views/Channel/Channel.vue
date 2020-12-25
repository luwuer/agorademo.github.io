<template>
  <div class="one-to-one">
    <Room :name="name" :time="0">
      <div ref="video-wrapper" class="video-wrapper" :style="{ height }">
        <div ref="local" id="local" class="video-local video-item">
          <!-- <span v-show="isPlaying">我</span> -->
        </div>
      </div>
    </Room>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref
} from "vue";
import Room from "@/components/room/room.vue";
import store from "@/store";
import Agora from "@/assets/common/Agora";

export default defineComponent({
  name: "OneToOne",
  components: {
    Room
  },
  setup() {
    const { ctx } = getCurrentInstance() as any;
    const height = ref("0px");

    onMounted(() => {
      nextTick(() => {
        // temporary
        height.value = `${document.body.clientHeight - 60}px`;

        if (store.state.agora) {
          ((store.state.agora as unknown) as Agora).render(
            ctx.$refs["local"],
            ctx.$refs["ideo-wrapper"]
          );
        }
      });
    });

    return {
      height,
      name: store.state.channel
    };
  },
  beforeUnmount() {
    store.state.agora?.dispose();
    store.commit("setAgora", null);
  }
});
</script>

<style lang="stylus">
@import '~@/assets/style/vars.styl'

.one-to-one {
  display flex
  align-items stretch
  width 100%

  .video-wrapper {
    box-sizing border-box
    flex 0 0 10.5rem
    padding 0.5rem 0
    overflow-y auto
    background-color $back-light
    box-shadow 0 2px 2px 0 rgba(77, 77, 77, 0.14), 0 3px 1px -2px rgba(77, 77, 77, 0.2), 0 1px 5px 0 rgba(77, 77, 77, 0.5)
    text-align left

    &>div {
      display flex
      justify-content center
      align-items center
      width 10.5rem
      height 7rem
      font-size: 1rem;
      background-color $primary
      color $back
    }

    .video-item {
      flex 1 1 10.5rem
      height 7rem
      margin-bottom 0.1rem
    }
  }
}
</style>
