<template>
  <img src="@/assets/icons/arcweight.svg" alt="Arc Weight" class="arc" />
</template>

<script>
import Konva from "konva";

export default {
  methods: {
    changeArcWeight(event) {
      if (this.changeArcWeightClicked()) {
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
          if (value > 1) {
            arc.multiplicity = +value;
          } else {
            arc.multiplicity = 1;
            labelForChange.visible(false);
          }
          labelForChange.getText().text(arc.multiplicity);
        }
      }
    },
    changeArcWeightClicked() {
      if (this.$store.state.clicked.type === "arcWeight") return 1;
      return 0;
    },
  },
  mounted() {
    this.$store.state.stage.on("mousedown", (event) => {
      this.changeArcWeight(event);
    });
  },
};
</script>

<style scoped></style>
