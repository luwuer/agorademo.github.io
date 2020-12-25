<template>
  <div class="room">
    <room-header :name="name" :time="time"></room-header>
    <div class="room-content">
      <slot />
    </div>
    <room-controls></room-controls>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RoomHeader from "./room-header.vue";
import RoomControls from "./room-controls.vue";

export default defineComponent({
  name: "room",
  components: {
    RoomHeader,
    RoomControls
  },
  props: {
    name: String,
    time: Number
  }
});
</script>

<style lang="stylus">
.room {
  position relative
  display flex
  flex-direction column
  align-items center
  width 100%
  overflow hidden

  .room-content {
    display flex
    align-content stretch
    flex 1 1 auto
    width 100%
    margin-bottom -1.4rem
  }
}
</style>
