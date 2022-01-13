<template>
  <img
    src="@/assets/icons/clear.svg"
    alt="Clear Canvas"
    @click="clearCanvas()"
  />
</template>

<script>
export default {
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
