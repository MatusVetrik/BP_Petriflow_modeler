<template>
  <action-panel></action-panel>
  <my-canvas></my-canvas>
</template>

<script>
import MyCanvas from "@/components/MyCanvas";
import ActionPanel from "@/components/ActionPanel";
export default {
  components: {
    MyCanvas,
    ActionPanel,
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
