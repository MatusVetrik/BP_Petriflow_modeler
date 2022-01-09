<template>
  <div ref="container" class="wrapper" @mousedown="clickOnCanvas"></div>
</template>

<script>
import Konva from "konva";

export default {
  data() {
    return {
      stage: null,
      layer: null,
    };
  },
  mounted() {
    this.stage = new Konva.Stage({
      container: this.$refs.container,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.$store.state.stage = this.stage;
    this.$store.state.layer = this.layer;
    window.addEventListener("resize", this.setCanvasResponsive);
  },
  methods: {
    clickOnCanvas(event) {
      if (this.$store.state.clicked.type === "transition") {
        this.$store.dispatch("drawTransition", {
          event: event,
          stage: this.stage,
          layer: this.layer,
          label: "",
          visibility: false,
        });
      }
      if (this.$store.state.clicked.type === "place") {
        this.$store.dispatch("drawPlace", {
          event: event,
          stage: this.stage,
          layer: this.layer,
          label: "",
          tokens: 0,
          visibility: false,
        });
      }
    },
    setCanvasResponsive() {
      this.stage.width(window.innerWidth);
      this.stage.height(window.innerHeight);
    },
  },
};
</script>

<style>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
