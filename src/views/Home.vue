<template>
  <div class="home">
    <el-form :inline="false" :model="form" class="form" :rules="rules">
      <el-form-item label="Appid" prop="appid">
        <el-input v-model="form.appid" placeholder="Appid"></el-input>
      </el-form-item>
      <el-form-item label="Token" prop="token">
        <el-input v-model="form.token" placeholder="Token"></el-input>
      </el-form-item>
      <el-form-item label="Channel" prop="channel">
        <el-input v-model="form.channel" placeholder="Channel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="joinChannel">join channel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import Agora from "@/assets/common/Agora";
import store from "@/store";
import router from "@/router";

const DEFAULT = config.agoraDefault;

type FormInline = {
  appid: string;
  token: string;
  channel: string;
};

export default defineComponent({
  name: "Home",
  setup() {
    const form: FormInline = reactive({
      appid: DEFAULT.appid,
      token: DEFAULT.token,
      channel: DEFAULT.channel
    });

    const rules = {
      appid: { required: true, message: "Appid is required", trigger: "blur" },
      token: { required: true, message: "Token is required", trigger: "blur" },
      channel: {
        required: true,
        message: "Channel is required",
        trigger: "blur"
      }
    };

    store.commit("setChannel", form.channel);
    watch(
      () => form.channel,
      nv => {
        store.commit("setChannel", nv);
      }
    );

    const joinChannel = function() {
      const agora = new Agora({
        appid: form.appid,
        token: form.token,
        channel: form.channel,
        handleSuccess: uid => {
          window.logger.log("info", `join channel success, uid: ${uid}`);
        },
        handleError: err => {
          window.logger.log("info", `join channel failture, err: ${err}`);
        }
      });

      window.agora = agora;
      router.push("channel");
    };

    return { form, rules, joinChannel };
  }
});
</script>

<style lang="stylus">
@import '~@/assets/style/vars.styl'

.home {
  display flex
  justify-content center
  align-items center
  width 100%

  .form {
    flex 0 0 auto
    width 400px
    padding 12px 24px
    background $back-light
    box-shadow 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)
  }
}
</style>
