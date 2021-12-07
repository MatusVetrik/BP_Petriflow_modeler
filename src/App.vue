<template>
  <div id="panel">
    <action-panel></action-panel>
  </div>
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

<style scoped>
#panel {
  position: absolute;
  top: 0;
  left: 5;
  height: 39.5rem;
  padding: 0.15rem;
  background: linear-gradient(to bottom, rgb(75, 195, 255), rgb(135, 80, 255));
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.4);
  border-radius: 0 0 5rem 5rem;
  /* border-right: 0.5px solid black; */
}
</style>
