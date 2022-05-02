<template>
  <img src="@/assets/icons/arc.svg" alt="Arc" class="arc" />
</template>

<script>
import Konva from "konva";
import {
  getConnectorPoints,
  whatOperationWasClicked,
} from "@/helper/helperFunctions";

export default {
  data() {
    return {
      arrow: null,
      start: [0, 0],
      startId: null,
      dragging: false,
    };
  },
  methods: {
    mouseDown(event) {
      if (
        whatOperationWasClicked(this.$store.state.clicked.type, "arc") &&
        !this.dragging
      ) {
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
            hitStrokeWidth: 10,
            fill: "black",
          });
          this.$store.state.layer.add(this.arrow);
          this.$store.state.layer.batchDraw();
          this.startId = event.target._id;
          this.dragging = true;
        }
      }
    },
    mouseMove() {
      if (
        this.arrow &&
        (this.start[0] || this.start[1]) &&
        whatOperationWasClicked(this.$store.state.clicked.type, "arc") &&
        this.dragging
      ) {
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
      if (
        whatOperationWasClicked(this.$store.state.clicked.type, "arc") &&
        this.dragging
      ) {
        if (this.arrow) this.checkObjects(event.target);
        this.arrow = null;
        this.startId = null;
        this.dragging = false;
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
        points = getConnectorPoints(
          {x: start[0], y: start[1]},
          {x: found.attrs.x + 20, y: found.attrs.y + 20}
        );
      } else if (found instanceof Konva.Circle && this.start[0]) {
        // points = [start[0], start[1], found.attrs.x, found.attrs.y];
        points = getConnectorPoints(
          {x: start[0], y: start[1]},
          {x: found.attrs.x, y: found.attrs.y}
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
          multiplicityLabel: "",
          labelVisibility: false,
          multiplicity: 1,
        });
      }
    },
  },
  mounted() {
    this.$store.state.stage.on("mousedown", (event) => {
      this.mouseUp(event);
      this.mouseDown(event);
    });
    this.$store.state.stage.on("mousemove", this.mouseMove);
  },
};
</script>

<style scoped></style>
