<template>
  <img :src="move.src" alt="Move" @click="draggingObjects()" />
</template>

<script>
import Konva from "konva";

export default {
  data() {
    return {
      move: {
        src: require("../assets/icons/move.svg"),
      },
    };
  },
  methods: {
    draggingObjects() {
      const layerChildren = this.$store.state.layer.children;
      for (let i = 0; i < layerChildren.length; i++) {
        if (
          layerChildren[i] instanceof Konva.Rect ||
          layerChildren[i] instanceof Konva.Circle
        ) {
          layerChildren[i].draggable(true);
          let element = this.$store.state.transitions.find(
            (el) => layerChildren[i]._id == el.id
          );
          if (!element) {
            element = this.$store.state.places.find(
              (el) => layerChildren[i]._id == el.id
            );
          }
          const elLabel = layerChildren.find((el) => el._id == element.labelId);
          layerChildren[i].on("dragmove", () => {
            element.x = layerChildren[i].x();
            element.y = layerChildren[i].y();
            if (layerChildren[i] instanceof Konva.Rect) {
              elLabel.x(layerChildren[i].x() - 30);
              elLabel.y(layerChildren[i].y() + 40);
            } else if (layerChildren[i] instanceof Konva.Circle) {
              const elTokenLabel = layerChildren.find(
                (el) => el._id == element.tokenLabel
              );
              elLabel.x(layerChildren[i].x() - 50);
              elLabel.y(layerChildren[i].y() + 20);
              elTokenLabel.x(layerChildren[i].x() - 20);
              elTokenLabel.y(layerChildren[i].y() - 9);
            }
            const arcs = this.$store.state.arcs;
            for (let j = 0; j < arcs.length; j++) {
              const arrowSource = layerChildren.find(
                (el) => el._id === arcs[j].sourceId
              );
              const arrowDest = layerChildren.find(
                (el) => el._id === arcs[j].destinationId
              );
              if (arcs[j].destinationId === element.id) {
                const arrow = layerChildren.find((el) => el._id === arcs[j].id);
                let offsetSource = 0;
                if (arrowSource instanceof Konva.Rect) {
                  offsetSource = 20;
                }
                let offsetDest = 0;
                if (arrowDest instanceof Konva.Rect) {
                  offsetDest = 20;
                }

                const points = this.getConnectorPoints(
                  {
                    x: parseInt(arrowSource.x()) + offsetSource,
                    y: parseInt(arrowSource.y()) + offsetSource,
                  },
                  {
                    x: parseInt(layerChildren[i].x()) + offsetDest,
                    y: parseInt(layerChildren[i].y()) + offsetDest,
                  }
                );
                arrow.points(points);
                const arcWeight = layerChildren.find(
                  (el) => el._id == arcs[j].labelId
                );
                arcWeight.x((points[2] + points[0]) / 2 - 10);
                arcWeight.y((points[3] + points[1]) / 2 - 10);
              } else if (arcs[j].sourceId === element.id) {
                const arrow = layerChildren.find((el) => el._id === arcs[j].id);
                let offsetDest = 0;
                if (arrowDest instanceof Konva.Rect) {
                  offsetDest = 20;
                }
                let offsetSource = 0;
                if (arrowSource instanceof Konva.Rect) {
                  offsetSource = 20;
                }

                const points = this.getConnectorPoints(
                  {
                    x: parseInt(layerChildren[i].x()) + offsetSource,
                    y: parseInt(layerChildren[i].y()) + offsetSource,
                  },
                  {
                    x: parseInt(arrowDest.x()) + offsetDest,
                    y: parseInt(arrowDest.y()) + offsetDest,
                  }
                );
                arrow.points(points);
                const arcWeight = layerChildren.find(
                  (el) => el._id == arcs[j].labelId
                );
                arcWeight.x((points[2] + points[0]) / 2 - 10);
                arcWeight.y((points[3] + points[1]) / 2 - 10);
              }
            }
          });
        }
      }
    },
    getConnectorPoints(from, to) {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      let angle = Math.atan2(-dy, dx);

      const radius = 23;
      return [
        from.x + -radius * Math.cos(angle + Math.PI),
        from.y + radius * Math.sin(angle + Math.PI),
        to.x + -radius * Math.cos(angle),
        to.y + radius * Math.sin(angle),
      ];
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
