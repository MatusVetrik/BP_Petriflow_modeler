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
      width: 1900,
      height: 900,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.layer.zIndex(0);
    this.$store.state.layer = this.layer;
    this.$store.state.stage = this.stage;
  },
  methods: {
    clickOnCanvas(event) {
      if (this.$store.state.clicked.type === "transition") {
        this.$store.dispatch("drawTransition", {
          event: event,
          stage: this.stage,
          layer: this.layer,
        });
      }
      if (this.$store.state.clicked.type === "place") {
        this.$store.dispatch("drawPlace", {
          event: event,
          stage: this.stage,
          layer: this.layer,
        });
      }
      if (this.$store.state.clicked.type === "delete") {
        this.$store.dispatch("deleteObject", {
          event: event,
          stage: this.stage,
          layer: this.layer,
        });
      }
      if (this.$store.state.clicked.type === "addTokens") {
        this.$store.dispatch("addTokens", {
          event: event,
          stage: this.stage,
          layer: this.layer,
        });
      }
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
