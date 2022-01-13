<template>
  <div id="topBar">
    <panel-tooltip text="Transition">
      <img
        src="@/assets/icons/transition.svg"
        alt="Transition"
        @click="chooseAction('transition')"
        :style="
          this.$store.state.clicked.type === 'transition'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Place">
      <img
        src="@/assets/icons/place.svg"
        alt="Place"
        @click="chooseAction('place')"
        :style="
          this.$store.state.clicked.type === 'place'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
    </panel-tooltip>
    <change-tokens @click="clearSimulationMode()" />
    <panel-tooltip text="Change Label">
      <change-label
        @click="chooseAction('change')"
        :style="
          this.$store.state.clicked.type === 'change'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Arc">
      <draw-arc
        @click="chooseAction('arc')"
        :style="
          this.$store.state.clicked.type === 'arc'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Arc Weight">
      <change-weight
        @click="chooseAction('arcWeight')"
        :style="
          this.$store.state.clicked.type === 'arcWeight'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Delete">
      <delete-object
        @click="chooseAction('delete')"
        :style="
          this.$store.state.clicked.type === 'delete'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Clear">
      <clear-canvas
        @click="chooseAction('clear')"
        :style="
          this.$store.state.clicked.type === 'clear'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Move">
      <move-element
        @click="chooseAction('move')"
        :style="
          this.$store.state.clicked.type === 'move'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
        ref="move"
      />
    </panel-tooltip>
    <panel-tooltip text="Save XML">
      <save-net
        @click="chooseAction('save')"
        :style="
          this.$store.state.clicked.type === 'save'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Load XML">
      <import-net
        @click="chooseAction('import')"
        :style="
          this.$store.state.clicked.type === 'import'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Simulation">
      <start-simulation
        ref="simulationComponent"
        @mousedown="chooseAction('simulation')"
        @click="$refs.simulationComponent.simulationRound()"
        :style="
          this.$store.state.clicked.type === 'simulation'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
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
  },
};
</script>

<style>
img {
  width: 1.4rem;
  border: solid 3px white;
  padding: 0.5rem;
  margin: 0.15rem;
  border-radius: 1rem;
  transition: 0.2s;
  background-color: white;
}

img:hover {
  transform: scale(1.15);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

#topBar {
  margin: 0.25rem;
  display: flex;
  justify-content: center;
}
</style>
