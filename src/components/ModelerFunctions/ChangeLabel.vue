<script>
export default {
  emits: ["change-label"],
  methods: {
    changeLabel(event) {
      if (this.changeLabelClicked()) {
        const transitions = this.$store.state.transitions;
        const trans = transitions.find((el) => el.id === event.target._id);
        if (trans) {
          const value = window.prompt("Add label to transition: ");
          trans.label = value;
          s;
          const labelForChange = event.target.parent.children.find(
            (el) => el._id === trans.labelId
          );
          labelForChange.getText().text(trans.label);
        }
      }
      this.$emit("changeLabel", event);
    },
    changeLabelClicked() {
      if (this.$store.state.clicked.type === "change") return 1;
      return 0;
    },
  },
};
</script>

<style scoped></style>
