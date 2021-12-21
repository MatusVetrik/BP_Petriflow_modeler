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
      arrow: null,
      start: [0, 0],
      startId: null,
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
    this.stage.on("mousedown", (event) => {
      this.mouseDown(event);
      this.changeTokens(event);
      this.deleteObject(event);
      this.changeLabel(event);
      this.changeArcWeight(event);
    });
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
    changeArcWeight(event) {
      if (this.changeArcWeightClicked()) {
        const arcs = this.$store.state.arcs;
        const arc = arcs.find((el) => el.id === event.target._id);
        if (arc) {
          const value = window.prompt("Add weight to the arc: ");
          value > 1 ? (arc.multiplicity = +value) : (arc.multiplicity = 1);
          const labelForChange = event.target.parent.children.find(
            (el) => el._id === arc.labelId
          );
          console.log(this.layer);
          labelForChange.getText().text(arc.multiplicity);
        }
      }
    },
    changeArcWeightClicked() {
      if (this.$store.state.clicked.type === "arcWeight") return 1;
      return 0;
    },
    changeLabel(event) {
      if (this.changeLabelClicked()) {
        const transitions = this.$store.state.transitions;
        const trans = transitions.find((el) => el.id === event.target._id);
        if (trans) {
          const value = window.prompt("Add label to transition: ");
          trans.label = value;
          const labelForChange = event.target.parent.children.find(
            (el) => el._id === trans.labelId
          );
          labelForChange.getText().text(trans.label);
        }
      }
    },
    changeLabelClicked() {
      if (this.$store.state.clicked.type === "change") return 1;
      return 0;
    },
    deleteObject(event) {
      if (this.deleteObjectClicked()) {
        const object = this.layer.children.find(
          (el) => el._id === event.target._id
        );
        if (object) {
          const transitions = this.$store.state.transitions.filter(
            (el) => el.id !== event.target._id
          );
          const places = this.$store.state.places.filter(
            (el) => el.id !== event.target._id
          );
          this.$store.state.transitions = transitions;
          this.$store.state.places = places;
          object.destroy();
        }
        this.layer.batchDraw();
      }
    },
    deleteObjectClicked() {
      if (this.$store.state.clicked.type === "delete") return 1;
      return 0;
    },
    changeTokens(event) {
      if (this.changeTokensClicked != 0) {
        const places = this.$store.state.places;
        const changingDestination = places.find(
          (el) => el.id === event.target._id
        );
        if (changingDestination) {
          if (this.changeTokensClicked() === "add") {
            changingDestination.tokens++;
          } else if (this.changeTokensClicked() === "remove") {
            if (changingDestination.tokens > 0) changingDestination.tokens--;
          }
          const labelForChange = event.target.parent.children.find(
            (el) => el._id === changingDestination.tokenLabel
          );
          if (changingDestination.tokens === 0)
            labelForChange.getText().text("");
          else labelForChange.getText().text(changingDestination.tokens);
        }
      }
    },
    changeTokensClicked() {
      if (this.$store.state.clicked.type === "addTokens") return "add";
      else if (this.$store.state.clicked.type === "removeTokens")
        return "remove";
      return 0;
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
            strokeWidth: 2,
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
        this.createEndOfArrow(start, found, target);
      } else if (
        !(target instanceof Konva.Circle) &&
        !(target instanceof Konva.Rect)
      ) {
        target.destroy();
        this.layer.batchDraw();
      }
    },
    createEndOfArrow(start, found, target) {
      let points;
      if (found instanceof Konva.Rect && this.start[1]) {
        // points = [start[0], start[1], found.attrs.x + 20, found.attrs.y + 20];
        points = this.getConnectorPoints(
          { x: start[0], y: start[1] },
          { x: found.attrs.x + 20, y: found.attrs.y + 20 }
        );
      } else if (found instanceof Konva.Circle && this.start[0]) {
        // points = [start[0], start[1], found.attrs.x, found.attrs.y];
        points = this.getConnectorPoints(
          { x: start[0], y: start[1] },
          { x: found.attrs.x, y: found.attrs.y }
        );
      }
      this.arrow.points(points);
      this.layer.batchDraw();
      if (points) {
        this.$store.dispatch("addArc", {
          layer: this.layer,
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
    getConnectorPoints(from, to) {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      let angle = Math.atan2(-dy, dx);

      const radius = 35;

      return [
        from.x + -radius * Math.cos(angle + Math.PI),
        from.y + radius * Math.sin(angle + Math.PI),
        to.x + -radius * Math.cos(angle),
        to.y + radius * Math.sin(angle),
      ];
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
