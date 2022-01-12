<template>
  <div id="topBar">
    <div class="tooltip">
      <img
        :src="transition.src"
        alt="Transition"
        @click="chooseAction('transition')"
        :style="
          this.$store.state.clicked.type === 'transition'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
      <div class="tooltiptext">Transition</div>
    </div>
    <div class="tooltip">
      <img
        :src="place.src"
        alt="Place"
        @click="chooseAction('place')"
        :style="
          this.$store.state.clicked.type === 'place'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
      <div class="tooltiptext">Place</div>
    </div>
    <change-tokens @click="clearSimulationMode()" />
    <div class="tooltip">
      <change-label
        @click="chooseAction('change')"
        :style="
          this.$store.state.clicked.type === 'change'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
      <div class="tooltiptext">Label</div>
    </div>
    <div class="tooltip">
      <draw-arc
        @click="chooseAction('arc')"
        :style="
          this.$store.state.clicked.type === 'arc'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
      <div class="tooltiptext">Arc</div>
    </div>
    <div class="tooltip">
      <change-weight
        @click="chooseAction('arcWeight')"
        :style="
          this.$store.state.clicked.type === 'arcWeight'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
      <div class="tooltiptext">Arc Weight</div>
    </div>
    <div class="tooltip">
      <delete-object
        @click="chooseAction('delete')"
        :style="
          this.$store.state.clicked.type === 'delete'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
      <div class="tooltiptext">Delete</div>
    </div>
    <div class="tooltip">
      <clear-canvas
        @click="chooseAction('clear')"
        :style="
          this.$store.state.clicked.type === 'clear'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
      <div class="tooltiptext">Clear</div>
    </div>
    <div class="tooltip">
      <move-element
        @click="chooseAction('move')"
        :style="
          this.$store.state.clicked.type === 'move'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
        ref="move"
      />
      <div class="tooltiptext">Move</div>
    </div>
    <div class="tooltip">
      <save-net
        @click="chooseAction('save')"
        :style="
          this.$store.state.clicked.type === 'save'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
      <div class="tooltiptext">Save XML</div>
    </div>
    <div class="tooltip">
      <import-net
        @click="chooseAction('import')"
        :style="
          this.$store.state.clicked.type === 'import'
            ? { 'border-color': 'black' }
            : { 'border-color': 'white' }
        "
      />
      <div class="tooltiptext">Load XML</div>
    </div>
    <div class="tooltip">
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
      <div class="tooltiptext">Simulation</div>
    </div>
  </div>
</template>

<script>
import ChangeLabel from "./ChangeLabel.vue";
import ChangeWeight from "./ChangeWeight.vue";
import DeleteObject from "./DeleteObject.vue";
import ChangeTokens from "./ChangeTokens.vue";
import DrawArc from "./DrawArc.vue";
import StartSimulation from "./StartSimulation.vue";
import SaveNet from "./SaveNet.vue";
import ImportNet from "./ImportNet.vue";
import ClearCanvas from "./ClearCanvas.vue";
import MoveElement from "./MoveElement.vue";

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
  },
  data() {
    return {
      transition: {
        src: require("../assets/icons/transition.svg"),
      },
      place: {
        src: require("../assets/icons/place.svg"),
      },
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
  /* flex-direction: column; */
}

.tooltip {
  position: relative;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tooltip .tooltiptext {
  visibility: hidden;
  opacity: 0;
  color: #000;
  border-radius: 2rem;
  padding: 5px;
  font-size: 50%;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.432);
  white-space: nowrap;

  position: absolute;
  z-index: 2;
  top: 135%;
  transition: 0.5s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 0.7;
  transform: scale(2);
  border-radius: 10px;
}
</style>
