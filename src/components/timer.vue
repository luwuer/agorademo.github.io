<template>
  <span>{{ time }}</span>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { getTimeStamp, timestampToString } from "@/assets/utils/index";

export default defineComponent({
  name: "Timer",
  setup() {
    const startTimestamp = getTimeStamp();
    const timestamp = ref(0);
    const time = computed(() => {
      return timestampToString(timestamp.value - startTimestamp);
    });

    timestamp.value = getTimeStamp();
    setInterval(() => {
      timestamp.value = getTimeStamp();
    }, 1000);

    return {
      time
    };
  }
});
</script>
