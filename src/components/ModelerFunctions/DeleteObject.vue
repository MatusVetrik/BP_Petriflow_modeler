<template>
  <img src="@/assets/icons/delete.svg" alt="Delete Node" />
</template>

<script>
import Konva from "konva";
import {
  whatOperationWasClicked,
  reactToActivatedOperation,
} from "../../helper/helperFunctions";

export default {
  methods: {
    deleteObject(event) {
      if (whatOperationWasClicked(this.$store.state.clicked.type, "delete")) {
        const object = this.$store.state.layer.children.find(
          (el) => el._id === event.target._id
        );
        if (object) {
          this.deleteTransition(event);
          this.deletePlace(event);
          this.deleteArc(event);
          let arcs = this.$store.state.arcs;
          if (event.target instanceof Konva.Arrow) {
            arcs = this.$store.state.arcs.filter(
              (el) => el.id !== event.target._id
            );
          } else {
            arcs = this.deleteConnectedArcs(event);
          }
          const transitions = this.$store.state.transitions.filter(
            (el) => el.id !== event.target._id
          );
          const places = this.$store.state.places.filter(
            (el) => el.id !== event.target._id
          );
          this.$store.state.transitions = transitions;
          this.$store.state.places = places;
          this.$store.state.arcs = arcs;
          object.destroy();
        }
      }
    },
    deleteTransition(event) {
      let transObj = this.$store.state.transitions.find(
        (el) => el.id === event.target._id
      );

      if (transObj) {
        const label = this.$store.state.layer.children.find(
          (el) => el._id === transObj.labelId
        );
        label.visible(false);
      }
    },
    deletePlace(event) {
      let placeObj = this.$store.state.places.find(
        (el) => el.id === event.target._id
      );
      if (placeObj) {
        const labelToken = this.$store.state.layer.children.find(
          (el) => el._id === placeObj.tokenLabel
        );
        if (labelToken) {
          labelToken.visible(false);
        }
        const labelTag = this.$store.state.layer.children.find(
          (el) => el._id === placeObj.labelId
        );
        if (labelTag) {
          labelTag.visible(false);
        }
      }
    },
    deleteArc(event) {
      let arcObj = this.$store.state.arcs.find(
        (el) => el.id === event.target._id
      );
      if (arcObj) {
        const label = this.$store.state.layer.children.find(
          (el) => el._id === arcObj.labelId
        );
        label.visible(false);
      }
    },
    deleteConnectedArcs(event) {
      const storedArcs = this.$store.state.arcs;
      let arcs = [];
      for (let i = 0; i < storedArcs.length; i++) {
        if (
          storedArcs[i].sourceId === event.target._id ||
          storedArcs[i].destinationId === event.target._id
        ) {
          const arcToDestory = this.$store.state.layer.children.find(
            (el) => el._id === storedArcs[i].id
          );
          const arcMultiplicity = this.$store.state.layer.children.find(
            (el) => el._id === storedArcs[i].labelId
          );
          if (arcMultiplicity) {
            arcMultiplicity.visible(false);
          }
          arcToDestory.destroy();
        } else {
          arcs.push(storedArcs[i]);
        }
      }
      return arcs;
    },
  },
  mounted() {
    reactToActivatedOperation(this.$store.state.stage, this.deleteObject);
  },
};
</script>

<style scoped></style>
