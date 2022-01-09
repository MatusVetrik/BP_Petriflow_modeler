<template>
  <div>
    <div class="tooltip">
      <img
        :src="addTokens.src"
        alt="Add Token"
        @click="chooseAction('addTokens')"
      />
      <div class="tooltiptext">Add Tokens</div>
    </div>
    <div class="tooltip">
      <img
        :src="removeTokens.src"
        alt="Remove Token"
        @click="chooseAction('removeTokens')"
      />
      <div class="tooltiptext">Remove Tokens</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addTokens: {
        src: require("../assets/icons/addtokens.svg"),
      },
      removeTokens: {
        src: require("../assets/icons/removetokens.svg"),
      },
    };
  },
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
  flex-direction: column;
}
</style>
