<template>
  <img :src="arcWeight.src" alt="Arc Weight" class="arc" />
</template>

<script>
export default {
  data() {
    return {
      arcWeight: {
        src: require("../assets/icons/arcweight.svg"),
      },
    };
  },
  methods: {
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
  },
  mounted() {
    this.$store.state.stage.on("mousedown", (event) => {
      this.changeArcWeight(event);
    });
  },
};
</script>

<style scoped></style>
