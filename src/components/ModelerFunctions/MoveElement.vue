<template>
  <img src="@/assets/icons/move.svg" alt="Move" @click="draggingObjects()" />
</template>

<script>
import Konva from "konva";
import {getConnectorPoints} from "../helper/helperFunctions";

export default {
  data() {
    return {
      layerChildren: null,
      arcs: null,
    };
  },
  methods: {
    draggingObjects() {
      this.layerChildren = this.$store.state.layer.children;
      for (let i = 0; i < this.layerChildren.length; i++) {
        if (
          this.layerChildren[i] instanceof Konva.Rect ||
          this.layerChildren[i] instanceof Konva.Circle
        ) {
          this.layerChildren[i].draggable(true);
          let element = this.$store.state.transitions.find(
            (el) => this.layerChildren[i]._id == el.id
          );
          if (!element) {
            element = this.$store.state.places.find(
              (el) => this.layerChildren[i]._id == el.id
            );
          }

          this.layerChildren[i].on("dragmove", () => {
            this.changeElementPosition(element, i);
            this.moveArrow(element, i);
          });
        }
      }
    },
    changeElementPosition(element, i) {
      const elLabel = this.layerChildren.find(
        (el) => el._id == element.labelId
      );
      element.x = this.layerChildren[i].x();
      element.y = this.layerChildren[i].y();
      if (this.layerChildren[i] instanceof Konva.Rect) {
        elLabel.x(this.layerChildren[i].x() - 30);
        elLabel.y(this.layerChildren[i].y() + 40);
      } else if (this.layerChildren[i] instanceof Konva.Circle) {
        const elTokenLabel = this.layerChildren.find(
          (el) => el._id == element.tokenLabel
        );
        elLabel.x(this.layerChildren[i].x() - 50);
        elLabel.y(this.layerChildren[i].y() + 20);
        elTokenLabel.x(this.layerChildren[i].x() - 20);
        elTokenLabel.y(this.layerChildren[i].y() - 9);
      }
    },
    moveArrow(element, i) {
      this.arcs = this.$store.state.arcs;
      for (let j = 0; j < this.arcs.length; j++) {
        const arrowSource = this.layerChildren.find(
          (el) => el._id === this.arcs[j].sourceId
        );
        const arrowDest = this.layerChildren.find(
          (el) => el._id === this.arcs[j].destinationId
        );
        if (this.arcs[j].destinationId === element.id) {
          this.repairArcPoints(true, arrowSource, arrowDest, i, j);
        } else if (this.arcs[j].sourceId === element.id) {
          this.repairArcPoints(false, arrowSource, arrowDest, i, j);
        }
      }
    },
    repairArcPoints(isDestination, arrowSource, arrowDest, i, j) {
      const arrow = this.layerChildren.find((el) => el._id === this.arcs[j].id);
      let offsetSource = 0;
      if (arrowSource instanceof Konva.Rect) {
        offsetSource = 20;
      }
      let offsetDest = 0;
      if (arrowDest instanceof Konva.Rect) {
        offsetDest = 20;
      }
      let points;
      if (isDestination) {
        points = getConnectorPoints(
          {
            x: parseInt(arrowSource.x()) + offsetSource,
            y: parseInt(arrowSource.y()) + offsetSource,
          },
          {
            x: parseInt(this.layerChildren[i].x()) + offsetDest,
            y: parseInt(this.layerChildren[i].y()) + offsetDest,
          }
        );
      } else {
        points = getConnectorPoints(
          {
            x: parseInt(this.layerChildren[i].x()) + offsetSource,
            y: parseInt(this.layerChildren[i].y()) + offsetSource,
          },
          {
            x: parseInt(arrowDest.x()) + offsetDest,
            y: parseInt(arrowDest.y()) + offsetDest,
          }
        );
      }
      arrow.points(points);
      const arcWeight = this.layerChildren.find(
        (el) => el._id == this.arcs[j].labelId
      );
      arcWeight.x((points[2] + points[0]) / 2 - 10);
      arcWeight.y((points[3] + points[1]) / 2 - 10);
    },
    draggingDisabled() {
      const layerChildren = this.$store.state.layer.children;
      for (let i = 0; i < layerChildren.length; i++) {
        if (
          layerChildren[i] instanceof Konva.Circle ||
          layerChildren[i] instanceof Konva.Rect
        ) {
          layerChildren[i].draggable(false);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
