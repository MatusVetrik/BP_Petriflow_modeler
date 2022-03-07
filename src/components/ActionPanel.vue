<template>
  <div id="topBar">
    <panel-tooltip text="Transition">
      <img
        src="@/assets/icons/transition.svg"
        alt="Transition"
        @click="chooseAction('transition')"
        :style="
          this.$store.state.clicked.type === 'transition'
            ? {
                transform: 'scale(1.1) translateY(7px)',
                'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
              }
            : { transform: 'scale(1) translateY(0)' }
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
            ? {
                transform: 'scale(1.1) translateY(7px)',
                'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
              }
            : { transform: 'scale(1) translateY(0)' }
        "
      />
    </panel-tooltip>
    <change-tokens @click="clearSimulationMode()" />
    <panel-tooltip text="Change Label">
      <change-label
        @click="chooseAction('change')"
        :style="
          this.$store.state.clicked.type === 'change'
            ? {
                transform: 'scale(1.1) translateY(7px)',
                'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
              }
            : { transform: 'scale(1) translateY(0)' }
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Arc">
      <draw-arc
        @click="chooseAction('arc')"
        :style="
          this.$store.state.clicked.type === 'arc'
            ? {
                transform: 'scale(1.1) translateY(7px)',
                'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
              }
            : { transform: 'scale(1) translateY(0)' }
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Arc Weight">
      <change-weight
        @click="chooseAction('arcWeight')"
        :style="
          this.$store.state.clicked.type === 'arcWeight'
            ? {
                transform: 'scale(1.1) translateY(7px)',
                'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
              }
            : { transform: 'scale(1) translateY(0)' }
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Delete">
      <delete-object
        @click="chooseAction('delete')"
        :style="
          this.$store.state.clicked.type === 'delete'
            ? {
                transform: 'scale(1.1) translateY(7px)',
                'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
              }
            : { transform: 'scale(1) translateY(0)' }
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Clear">
      <clear-canvas
        @click="chooseAction('clear')"
        :style="
          this.$store.state.clicked.type === 'clear'
            ? {
                transform: 'scale(1.1) translateY(7px)',
                'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
              }
            : { transform: 'scale(1) translateY(0)' }
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Move">
      <move-element
        @click="chooseAction('move')"
        :style="
          this.$store.state.clicked.type === 'move'
            ? {
                transform: 'scale(1.1) translateY(7px)',
                'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
              }
            : { transform: 'scale(1) translateY(0)' }
        "
        ref="move"
      />
    </panel-tooltip>
    <panel-tooltip text="Save XML">
      <save-net
        @click="chooseAction('save')"
        :style="
          this.$store.state.clicked.type === 'save'
            ? {
                transform: 'scale(1.1) translateY(7px)',
                'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
              }
            : { transform: 'scale(1) translateY(0)' }
        "
      />
    </panel-tooltip>
    <panel-tooltip text="Load XML">
      <import-net
        @click="chooseAction('import')"
        :style="
          this.$store.state.clicked.type === 'import'
            ? {
                transform: 'scale(1.1) translateY(7px)',
                'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
              }
            : { transform: 'scale(1) translateY(0)' }
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
            ? {
                transform: 'scale(1.1) translateY(7px)',
                'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
              }
            : { transform: 'scale(1) translateY(0)' }
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
