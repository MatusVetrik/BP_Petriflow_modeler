<template>
  <div>
    <panel-tooltip text="Add Token">
      <img
        src="@/assets/icons/addtokens.svg"
        alt="Add Token"
        @click="chooseAction('addTokens')"
        :style="
          this.$store.state.clicked.type === 'addTokens'
            ? {
                transform: 'scale(1.1) translateY(7px)',
                'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
              }
            : {transform: 'scale(1) translateY(0)'}
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Remove Token">
      <img
        src="@/assets/icons/removetokens.svg"
        alt="Remove Token"
        @click="chooseAction('removeTokens')"
        :style="
          this.$store.state.clicked.type === 'removeTokens'
            ? {
                transform: 'scale(1.1) translateY(7px)',
                'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
              }
            : {transform: 'scale(1) translateY(0)'}
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Change Marking">
      <img
        src="@/assets/icons/marking.svg"
        alt="Change Marking"
        @click="chooseAction('changeMarking')"
        :style="
          this.$store.state.clicked.type === 'changeMarking'
            ? {
                transform: 'scale(1.1) translateY(7px)',
                'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
              }
            : {transform: 'scale(1) translateY(0)'}
        "
      />
    </panel-tooltip>
  </div>
</template>

<script>
import PanelTooltip from "@/components/UI/PanelTooltip.vue";
import {reactToActivatedOperation} from "../../helper/helperFunctions";

export default {
  components: {PanelTooltip},
  methods: {
    chooseAction(type) {
      this.$store.dispatch("clickOnPanel", {
        type: type,
      });
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
            if (parseInt(value)) changingDestination.tokens = parseInt(value);
          }
          const labelForChange = event.target.parent.children.find(
            (el) => el._id === changingDestination.tokenLabel
          );
          changingDestination.tokens === 0
            ? this.changeTokensLabel(labelForChange, "", false)
            : this.changeTokensLabel(
                labelForChange,
                changingDestination.tokens,
                true
              );
        }
      }
    },
    changeTokensLabel(label, text, visibility) {
      label.getText().text(text);
      label.visible(visibility);
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
    reactToActivatedOperation(this.$store.state.stage, this.changeTokens);
  },
};
</script>

<style scoped>
div {
  display: flex;
}
img {
  margin-bottom: 0.15rem;
}
</style>
