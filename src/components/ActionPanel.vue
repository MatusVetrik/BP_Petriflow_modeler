<template>
  <div id="topBar">
    <panel-tooltip text="Transition">
      <img
        src="@/assets/icons/transition.svg"
        alt="Transition"
        @click="chooseAction('transition')"
        :style="isActivated('transition') ? activated : deactived"
      />
    </panel-tooltip>
    <panel-tooltip text="Place">
      <img
        src="@/assets/icons/place.svg"
        alt="Place"
        @click="chooseAction('place')"
        :style="isActivated('place') ? activated : deactived"
      />
    </panel-tooltip>
    <change-tokens @click="clearSimulationMode()" />
    <panel-tooltip text="Change Label">
      <change-label
        @click="chooseAction('change')"
        :style="isActivated('change') ? activated : deactived"
      />
    </panel-tooltip>
    <panel-tooltip text="Arc">
      <draw-arc
        @click="chooseAction('arc')"
        :style="isActivated('arc') ? activated : deactived"
      />
    </panel-tooltip>
    <panel-tooltip text="Arc Weight">
      <change-weight
        @click="chooseAction('arcWeight')"
        :style="isActivated('arcWeight') ? activated : deactived"
      />
    </panel-tooltip>
    <panel-tooltip text="Delete">
      <delete-object
        @click="chooseAction('delete')"
        :style="isActivated('delete') ? activated : deactived"
      />
    </panel-tooltip>
    <panel-tooltip text="Clear">
      <clear-canvas
        @click="chooseAction('clear')"
        :style="isActivated('clear') ? activated : deactived"
      />
    </panel-tooltip>
    <panel-tooltip text="Move">
      <move-element
        @click="chooseAction('move')"
        :style="isActivated('move') ? activated : deactived"
        ref="move"
      />
    </panel-tooltip>
    <panel-tooltip text="Save XML">
      <save-net
        @click="chooseAction('save')"
        :style="isActivated('save') ? activated : deactived"
      />
    </panel-tooltip>
    <panel-tooltip text="Load XML">
      <import-net
        @click="chooseAction('import')"
        :style="isActivated('import') ? activated : deactived"
      />
    </panel-tooltip>
    <panel-tooltip text="Simulation">
      <start-simulation
        ref="simulationComponent"
        @mousedown="chooseAction('simulation')"
        @click="$refs.simulationComponent.simulationRound()"
        :style="isActivated('simulation') ? activated : deactived"
      />
    </panel-tooltip>
  </div>
</template>

<script>
import ChangeLabel from "./ModelerFunctions/ChangeLabel.vue";
import ChangeWeight from "./ModelerFunctions/ChangeWeight.vue";
import DeleteObject from "./ModelerFunctions/DeleteObject.vue";
import ChangeTokens from "./ModelerFunctions/ChangeTokens.vue";
import DrawArc from "./ModelerFunctions/DrawArc.vue";
import StartSimulation from "./ModelerFunctions/StartSimulation.vue";
import SaveNet from "./ModelerFunctions/SaveNet.vue";
import ImportNet from "./ModelerFunctions/ImportNet.vue";
import ClearCanvas from "./ModelerFunctions/ClearCanvas.vue";
import MoveElement from "./ModelerFunctions/MoveElement.vue";
import PanelTooltip from "./UI/PanelTooltip.vue";

export default {
  components: {
    ChangeLabel,
    ChangeWeight,
    DeleteObject,
    ChangeTokens,
    DrawArc,
    StartSimulation,
    SaveNet,
    ImportNet,
    ClearCanvas,
    MoveElement,
    PanelTooltip,
  },
  data() {
    return {
      clicked: this.$store.state.clicked.type,
      activated: {
        transform: "scale(1.1) translateY(7px)",
        "box-shadow": "0 2px 8px rgba(0, 0, 0, 0.4)",
      },
      deactived: {transform: "scale(1) translateY(0)"},
    };
  },
  methods: {
    chooseAction(type) {
      this.$store.dispatch("clickOnPanel", {
        type: type,
      });
      this.clearSimulationMode();
      this.disableDragging();
    },
    clearSimulationMode() {
      const transitions = this.$store.state.transitions;
      if (transitions.length > 0) {
        for (let i = 0; i < transitions.length; i++) {
          this.$store.state.layer.children
            .find((el) => el._id === transitions[i].id)
            .fill("white");
        }
      }
    },
    disableDragging() {
      if (this.$store.state.clicked.type !== "move")
        this.$refs.move.draggingDisabled();
    },
    isActivated(type) {
      return this.$store.state.clicked.type === type;
    },
  },
};
</script>

<style>
img {
  width: 1.4rem;
  height: 1.6rem;
  border: solid 3px white;
  padding: 0.5rem;
  margin: 0.3rem;
  margin-top: 0;
  border-radius: 0 0 0.2rem 0.2rem;
  transition: 0.2s;
  background-color: white;
}

img:hover {
  transform: scale(1.1) translateY(7px) !important;
  box-shadow: 0 2px 8px rgba(255, 0, 0, 0.4);
}

#topBar {
  margin: 0.4rem;
  margin-top: 0;
  display: flex;
  justify-content: center;
}
</style>
