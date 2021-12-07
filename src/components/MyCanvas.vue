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
      mouseDownXY: {
        x: 0,
        y: 0,
      },
    };
  },
  mounted() {
    this.stage = new Konva.Stage({
      container: this.$refs.container,
      width: 1300,
      height: 900,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  },
  methods: {
    clickOnCanvas(event) {
      if (this.$store.state.clicked.type === "transition") {
        this.$store.dispatch("drawTransition", {
          event: event,
          stage: this.stage,
          layer: this.layer,
        });
        console.log(this.stage);
        console.log(this.layer);
      }
      if (this.$store.state.clicked.type === "place") {
        this.$store.dispatch("drawPlace", {
          event: event,
          stage: this.stage,
          layer: this.layer,
        });
      }
      if (this.$store.state.clicked.type === "arc") {
        this.beginArc = !this.beginArc;
        this.drawLine();
        this.$store.dispatch("drawSVG", {
          event: event,
          stage: this.stage,
          layer: this.layer,
          begin: this.beginArc,
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
    drawLine() {
      let arrow;
      this.stage.on("mousedown", () => {
        const pos = this.stage.getPointerPosition();
        arrow = new Konva.Arrow({
          points: [pos.x, pos.y],
          stroke: "black",
          fill: "black",
        });
        this.layer.add(arrow);
        this.layer.batchDraw();
      });
      this.stage.on("mousemove", () => {
        if (arrow) {
          const pos = this.stage.getPointerPosition();
          const points = [arrow.points()[0], arrow.points()[1], pos.x, pos.y];
          arrow.points(points);
          this.layer.batchDraw();
        }
      });
      this.stage.on("mouseup", () => {
        arrow = null;
      });
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
