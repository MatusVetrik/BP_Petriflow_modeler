<template>
  <img :src="arc.src" alt="Arc" class="arc" />
</template>

<script>
import Konva from "konva";
export default {
  data() {
    return {
      arrow: null,
      start: [0, 0],
      startId: null,
      arc: {
        src: require("../assets/icons/arc.svg"),
      },
    };
  },
  methods: {
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
            strokeWidth: 2,
            hitStrokeWidth: 20,
            fill: "black",
          });
          this.$store.state.layer.add(this.arrow);
          this.$store.state.layer.batchDraw();
          this.startId = event.target._id;
        }
      }
    },
    mouseMove() {
      if (this.arrow && (this.start[0] || this.start[1]) && this.drawLine()) {
        const pos = this.$store.state.stage.getPointerPosition();
        const points = [
          this.arrow.points()[0],
          this.arrow.points()[1],
          pos.x,
          pos.y,
        ];
        this.arrow.points(points);
        this.$store.state.layer.batchDraw();
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
        this.createEndOfArrow(start, found, target);
      } else if (
        !(target instanceof Konva.Circle) &&
        !(target instanceof Konva.Rect)
      ) {
        target.destroy();
        this.$store.state.layer.batchDraw();
      }
    },
    createEndOfArrow(start, found, target) {
      let points;
      if (found instanceof Konva.Rect && this.start[1]) {
        // points = [start[0], start[1], found.attrs.x + 20, found.attrs.y + 20];
        points = this.getConnectorPoints(
          { x: start[0], y: start[1] },
          { x: found.attrs.x + 20, y: found.attrs.y + 20 },
          true
        );
      } else if (found instanceof Konva.Circle && this.start[0]) {
        // points = [start[0], start[1], found.attrs.x, found.attrs.y];
        points = this.getConnectorPoints(
          { x: start[0], y: start[1] },
          { x: found.attrs.x, y: found.attrs.y }
        );
      }
      this.arrow.points(points);
      this.arrow.on("mouseover touchstart", function () {
        this.stroke("#00a2ec");
      });
      this.arrow.on("mouseout touchend", function () {
        this.stroke("black");
      });
      this.$store.state.layer.batchDraw();
      if (points) {
        this.$store.dispatch("addArc", {
          layer: this.$store.state.layer,
          id: target._id,
          start: this.startId,
          end: found._id,
          startXY: {
            x: start[0],
            y: start[1],
          },
          endXY: {
            x: found.attrs.x,
            y: found.attrs.y,
          },
        });
      }
    },
    getConnectorPoints(from, to, rect = false) {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      let angle = Math.atan2(-dy, dx);

      const radius = 22;
      let rectOffset = 0;
      if (rect) {
        rectOffset = Math.abs(Math.cos(angle) * 10);
      }
      return [
        from.x + -radius * Math.cos(angle + Math.PI),
        from.y + radius * Math.sin(angle + Math.PI),
        to.x + -(radius + rectOffset) * Math.cos(angle),
        to.y + (radius + rectOffset) * Math.sin(angle),
      ];
    },
  },
  mounted() {
    this.$store.state.stage.on("mousedown", (event) => {
      this.mouseDown(event);
    });
    this.$store.state.stage.on("mousemove", this.mouseMove);
    this.$store.state.stage.on("mouseup", (event) => this.mouseUp(event));
  },
};
</script>

<style scoped></style>
