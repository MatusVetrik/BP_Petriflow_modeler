<template>
  <div>
    <div class="tooltip">
      <img
        src="@/assets/icons/addtokens.svg"
        alt="Add Token"
        @click="chooseAction('addTokens')"
        :style="
          this.$store.state.clicked.type === 'addTokens'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
      <div class="tooltiptext">Add Token</div>
    </div>
    <div class="tooltip">
      <img
        src="@/assets/icons/removetokens.svg"
        alt="Remove Token"
        @click="chooseAction('removeTokens')"
        :style="
          this.$store.state.clicked.type === 'removeTokens'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
      <div class="tooltiptext">Remove Token</div>
    </div>
    <div class="tooltip">
      <img
        src="@/assets/icons/marking.svg"
        alt="Change Marking"
        @click="chooseAction('changeMarking')"
        :style="
          this.$store.state.clicked.type === 'changeMarking'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
      <div class="tooltiptext">Change Marking</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    chooseAction(type) {
      this.$store.dispatch("clickOnPanel", {
        type: type,
      });
      //   this.clearSimulationMode();
    },
    changeTokens(event) {
      if (this.changeTokensClicked != 0) {
        const places = this.$store.state.places;
        const changingDestination = places.find(
          (el) => el.id === event.target._id
        );
        if (changingDestination) {
          if (this.changeTokensClicked() === "add") {
            changingDestination.tokens++;
          } else if (this.changeTokensClicked() === "remove") {
            if (changingDestination.tokens > 0) changingDestination.tokens--;
          } else if (this.changeTokensClicked() === "change") {
            const value = window.prompt("Please enter place positive marking:");
            changingDestination.tokens = parseInt(value);
          }
          const labelForChange = event.target.parent.children.find(
            (el) => el._id === changingDestination.tokenLabel
          );
          if (changingDestination.tokens === 0) {
            labelForChange.getText().text("");
            labelForChange.visible(false);
          } else {
            labelForChange.getText().text(changingDestination.tokens);
            labelForChange.visible(true);
          }
        }
      }
    },
    changeTokensClicked() {
      if (this.$store.state.clicked.type === "addTokens") return "add";
      else if (this.$store.state.clicked.type === "removeTokens")
        return "remove";
      else if (this.$store.state.clicked.type === "changeMarking") {
        return "change";
      }
      return 0;
    },
  },
  mounted() {
    this.$store.state.stage.on("mousedown", (event) => {
      this.changeTokens(event);
    });
  },
};
</script>

<style scoped>
div {
  display: flex;
  /* flex-direction: column; */
}
img {
  margin-bottom: 0.3rem;
}
</style>
