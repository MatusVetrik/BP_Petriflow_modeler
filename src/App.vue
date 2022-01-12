<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap"
    rel="stylesheet"
  />
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

<style>
#panel {
  margin-left: auto;
  margin-right: auto;
  margin-top: -0.5rem;
  width: 44.5rem;
  padding: 0.15rem;
  background-color: rgb(75, 195, 255);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 0 0 4rem 4rem;
}
div {
  font-family: "Roboto", sans-serif;
  font-size: 1em;
}
</style>
