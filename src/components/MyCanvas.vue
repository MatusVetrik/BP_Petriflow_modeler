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
      arrow: null,
      start: [0, 0],
      startId: null,
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
    // this.layer.zIndex(0);
    this.stage.on("mousedown", (event) => this.mouseDown(event));
    this.stage.on("mousemove", this.mouseMove);
    this.stage.on("mouseup", (event) => this.mouseUp(event));
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
      if (this.$store.state.clicked.type === "arc") {
        this.drawLine();
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
      if (this.$store.state.clicked.type === "arc") return 1;
      return 0;
    },
    mouseDown(event) {
      if (this.drawLine()) {
        const transitions = this.$store.state.transitions;
        const places = this.$store.state.places;
        this.start[0] = transitions.find((el) => el.id === event.target._id);
        this.start[1] = places.find((el) => el.id === event.target._id);
        if (this.start[0] || this.start[1]) {
          this.arrow = new Konva.Arrow({
            points: this.start[0]
              ? [this.start[0].x, this.start[0].y]
              : [this.start[1].x, this.start[1].y],
            stroke: "black",
            fill: "black",
          });
          this.layer.add(this.arrow);
          // this.arrow.zIndex(0);
          this.layer.batchDraw();
          this.startId = event.target._id;
        }
      }
    },
    mouseMove() {
      if (this.arrow && (this.start[0] || this.start[1]) && this.drawLine()) {
        const pos = this.stage.getPointerPosition();
        const points = [
          this.arrow.points()[0],
          this.arrow.points()[1],
          pos.x,
          pos.y,
        ];
        this.arrow.points(points);
        this.layer.batchDraw();
      }
    },
    mouseUp(event) {
      if (this.drawLine()) {
        if (this.arrow) this.checkObjects(event.target);
        this.arrow = null;
        this.startId = null;
      }
    },
    checkObjects(target) {
      const start = [this.arrow.points()[0], this.arrow.points()[1]];
      const end = [this.arrow.points()[2], this.arrow.points()[3]];
      const found = target.parent.children.find(
        (children) =>
          (children instanceof Konva.Rect &&
            end[0] >= children.attrs.x &&
            end[0] <= children.attrs.x + 40 &&
            end[1] >= children.attrs.y &&
            end[1] <= children.attrs.y + 40) ||
          (children instanceof Konva.Circle &&
            end[0] >= children.attrs.x - 20 &&
            end[0] <= children.attrs.x + 20 &&
            end[1] >= children.attrs.y - 20 &&
            end[1] <= children.attrs.y + 20)
      );
      if (found) {
        let points;
        if (found instanceof Konva.Rect && this.start[1]) {
          points = [start[0], start[1], found.attrs.x + 20, found.attrs.y + 20];
          this.$store.dispatch("drawArc", {
            id: target._id,
            start: this.startId,
            end: found._id,
          });
        } else if (found instanceof Konva.Circle && this.start[0]) {
          points = [start[0], start[1], found.attrs.x, found.attrs.y];
          this.$store.dispatch("drawArc", {
            id: target._id,
            start: this.startId,
            end: found._id,
          });
        }
        this.arrow.points(points);
        this.layer.batchDraw();
      } else {
        target.destroy();
        this.layer.batchDraw();
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
