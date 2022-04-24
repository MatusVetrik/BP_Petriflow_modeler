<template>
  <img src="@/assets/icons/label.svg" alt="Change Label" />
</template>

<script>
import {
  reactToActivatedOperation,
  whatOperationWasClicked,
} from "../helper/helperFunctions";

export default {
  methods: {
    changeLabel(event) {
      if (whatOperationWasClicked(this.$store.state.clicked.type, "change")) {
        const transitions = this.$store.state.transitions;
        const trans = transitions.find((el) => el.id === event.target._id);
        const places = this.$store.state.places;
        const place = places.find((el) => el.id === event.target._id);
        if (trans) {
          const value = window.prompt("Add label to transition: ");
          trans.label = value;
          const labelForChange = event.target.parent.children.find(
            (el) => el._id === trans.labelId
          );
          labelForChange.getText().text(trans.label);
          labelForChange.visible(true);
        } else if (place) {
          const value = window.prompt("Add label to place: ");
          place.label = value;
          const labelForChange = event.target.parent.children.find(
            (el) => el._id === place.labelId
          );
          labelForChange.getText().text(place.label);
          labelForChange.visible(true);
        }
      }
    },
  },
  mounted() {
    reactToActivatedOperation(this.$store.state.stage, this.changeLabel);
  },
};
</script>

<style scoped></style>
