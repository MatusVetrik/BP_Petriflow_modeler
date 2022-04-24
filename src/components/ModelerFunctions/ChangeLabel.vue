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
          this.addLabelToObject(event, trans);
        } else if (place) {
          this.addLabelToObject(event, place);
        }
      }
    },
    addLabelToObject(event, object) {
      const value = window.prompt("Add label to object: ");
      object.label = value;
      const labelForChange = event.target.parent.children.find(
        (el) => el._id === object.labelId
      );
      labelForChange.getText().text(object.label);
      labelForChange.visible(true);
      return 0;
    },
  },
  mounted() {
    reactToActivatedOperation(this.$store.state.stage, this.changeLabel);
  },
};
</script>

<style scoped></style>
