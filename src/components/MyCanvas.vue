<template>
  <canvas
    width="10000"
    height="10000"
    ref="myCanvas"
    @click="clickOnCanvas"
  ></canvas>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("setCanvas", this.$refs.myCanvas);
  },
  methods: {
    clickOnCanvas(event) {
      if (this.$store.state.clicked.type === "transition") {
        this.$store.dispatch("drawSVG", {
          event: event,
          canvas: this.$refs.myCanvas,
        });
        this.$store.dispatch("drawTransition", {
          event: event,
          canvas: this.$refs.myCanvas,
        });
      }
      if (this.$store.state.clicked.type === "place") {
        this.$store.dispatch("drawSVG", {
          event: event,
          canvas: this.$refs.myCanvas,
        });
        this.$store.dispatch("drawPlace", {
          event: event,
          canvas: this.$refs.myCanvas,
        });
      }
      if (this.$store.state.clicked.type === "arc") {
        this.$store.dispatch("drawArc", {
          event: event,
          canvas: this.$refs.myCanvas,
        });
      }
    },
  },
};
</script>

<style scoped>
canvas {
  position: absolute;
  top: 4.5rem;
  left: 0;
  z-index: 4;
}
</style>
