<template>
  <div class="room-header">
    <div class="name">
      {{ name }}
    </div>
    <Timer />

    <div class="feats">
      <span class="share feat-item" :data-clipboard-text="href">
        <el-tooltip content="分享频道" placement="bottom" effect="light">
          <icon name="icon-fenxiang" />
        </el-tooltip>
      </span>

      <span class="setting feat-item">
        <el-tooltip content="打开设置" placement="bottom" effect="light">
          <icon name="icon-setting" />
        </el-tooltip>
      </span>

      <span class="setting feat-item" @click="exit">
        <el-tooltip content="退出频道" placement="bottom" effect="light">
          <icon name="icon-exit" />
        </el-tooltip>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Clipboard from "clipboard";
import {
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref
} from "vue";
import Timer from "../timer.vue";
import Icon from "../icon.vue";
import store from "@/store";
import router from "@/router";

export default defineComponent({
  name: "room-header",
  props: {
    name: String
  },
  components: { Timer, Icon },
  setup() {
    const { ctx } = getCurrentInstance() as any;
    const href = ref("");
    let clipboard: any;

    // 退出频道
    function exit() {
      store.state.agora?.dispose();
      router.back();
    }

    // 注册剪切板
    function registerClip() {
      clipboard = new Clipboard(".share");

      clipboard.on("success", function(e: any) {
        ctx.$message.success("频道已复制到剪切板");
        e.clearSelection();
      });

      clipboard.on("error", function(e: any) {
        ctx.$message.error("复制频道失败");
        window.logger.log("error", e);
      });
    }

    onMounted(() => {
      nextTick(() => {
        registerClip();
        href.value = location.href;
      });
    });

    return {
      href,
      clipboard,
      exit
    };
  },
  beforeUnmount() {
    this.clipboard?.destroy();
  }
});
</script>

<style lang="stylus">
@import '~@/assets/style/vars.styl'

.room-header {
  position relative
  display flex
  flex-direction column
  justify-content center
  flex 0 0 3rem
  width 100%
  background-color $back-light
  box-shadow 0 2px 2px 0 rgba(77, 77, 77 0.14), 0 3px 1px -2px rgba(77, 77, 77 0.12), 0 1px 5px 0 rgba(77, 77, 77 0.2)

  .name {
    font-size 1.4rem
    font-weight 500
  }

  .feats {
    position absolute
    right 1rem

    .feat-item {
      margin 0 0.5rem
      font-size 1rem
      cursor pointer
      color $primary

      :hover {
        color $hover
      }
    }
  }
}
</style>
