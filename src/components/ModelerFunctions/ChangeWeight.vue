<template>
  <img src="@/assets/icons/arcweight.svg" alt="Arc Weight" class="arc" />
</template>

<script>
import Konva from "konva";
import {
  whatOperationWasClicked,
  reactToActivatedOperation,
} from "../../helper/helperFunctions";

export default {
  methods: {
    changeArcWeight(event) {
      if (
        whatOperationWasClicked(this.$store.state.clicked.type, "arcWeight")
      ) {
        let isLabel = false;
        let labelForChange;
        const arcs = this.$store.state.arcs;
        let arc = arcs.find((el) => el.id === event.target._id);
        const labelEl = event.target.parent;
        if (!arc && labelEl instanceof Konva.Label) {
          arc = arcs.find((el) => el.labelId === labelEl._id);
          isLabel = true;
        }
        if (arc || labelEl instanceof Konva.Label) {
          const value = window.prompt("Add weight to the arc: ");
          if (!isLabel) {
            labelForChange = event.target.parent.children.find(
              (el) => el._id === arc.labelId
            );
          } else {
            labelForChange = labelEl;
          }
          labelForChange.visible(true);
          labelForChange.opacity(1);
          if (value > 1) {
            arc.multiplicity = +value;
          } else {
            arc.multiplicity = 1;
            labelForChange.visible(false);
            labelForChange.opacity(0);
          }
          labelForChange.getText().text(arc.multiplicity);
        }
      }
    },
  },
  mounted() {
    reactToActivatedOperation(this.$store.state.stage, this.changeArcWeight);
  },
};
</script>

<style scoped></style>
