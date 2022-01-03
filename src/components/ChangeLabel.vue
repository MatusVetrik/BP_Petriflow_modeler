<template>
  <img :src="changeLabelSrc.src" alt="Change Label" />
</template>

<script>
export default {
  data() {
    return {
      changeLabelSrc: {
        src: require("../assets/icons/label.svg"),
      },
    };
  },
  methods: {
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
  },
  mounted() {
    this.$store.state.stage.on("mousedown", (event) => {
      this.changeLabel(event);
    });
  },
};
</script>

<style scoped></style>
