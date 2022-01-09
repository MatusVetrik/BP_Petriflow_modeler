<template>
  <img :src="clear.src" alt="Clear Canvas" @click="clearCanvas()" />
</template>

<script>
export default {
  data() {
    return {
      clear: {
        src: require("../assets/icons/clear.svg"),
      },
    };
  },
  methods: {
    clearCanvas() {
      const answer = window.confirm(
        "Do you really want to clear data and canvas?"
      );
      if (answer) {
        this.$store.state.layer.destroyChildren();

        this.$store.state.transitions = [];
        this.$store.state.places = [];
        this.$store.state.arcs = [];
      }
    },
  },
};
</script>
<style scoped></style>
