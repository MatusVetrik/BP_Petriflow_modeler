<template>
  <my-canvas></my-canvas>
  <div id="panel">
    <action-panel></action-panel>
  </div>
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
  margin-left: auto;
  margin-right: auto;
  margin-top: -0.5rem;
  width: 41.5rem;
  padding: 0.15rem;
  background-color: rgb(75, 195, 255);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 0 0 4rem 4rem;
}
</style>
