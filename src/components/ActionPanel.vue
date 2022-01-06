<template>
  <div id="topBar">
    <div class="tooltip">
      <img
        :src="transition.src"
        alt="Transtition"
        @click="chooseAction('transition')"
      />
      <div class="tooltiptext">Transtition</div>
    </div>
    <div class="tooltip">
      <img :src="place.src" alt="Place" @click="chooseAction('place')" />
      <div class="tooltiptext">Place</div>
    </div>
    <change-tokens />
    <div class="tooltip">
      <change-label @click="chooseAction('change')" />
      <div class="tooltiptext">Label</div>
    </div>
    <div class="tooltip">
      <draw-arc @click="chooseAction('arc')" />
      <div class="tooltiptext">Arc</div>
    </div>
    <div class="tooltip">
      <change-weight @click="chooseAction('arcWeight')" />
      <div class="tooltiptext">Arc Weight</div>
    </div>
    <div class="tooltip">
      <delete-object @click="chooseAction('delete')" />
      <div class="tooltiptext">Delete</div>
    </div>
    <div class="tooltip">
      <save-net @click="chooseAction('save')" />
      <div class="tooltiptext">Save XML</div>
    </div>
    <div class="tooltip">
      <start-simulation
        @mousedown="chooseAction('simulation')"
        @click="simulationProcess()"
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

export default {
  components: {
    ChangeLabel,
    ChangeWeight,
    DeleteObject,
    ChangeTokens,
    DrawArc,
    StartSimulation,
    SaveNet,
  },
  data() {
    return {
      transition: {
        src: require("../assets/icons/transition.svg"),
      },
      place: {
        src: require("../assets/icons/place.svg"),
      },
      arc: {
        src: require("../assets/icons/arc.svg"),
      },
      move: {
        src: require("../assets/icons/move.svg"),
      },
      save: {
        src: require("../assets/icons/save.svg"),
      },
      arcWeight: {
        src: require("../assets/icons/arcweight.svg"),
      },
      deleteNode: {
        src: require("../assets/icons/delete.svg"),
      },
      changeLabel: {
        src: require("../assets/icons/label.svg"),
      },
    };
  },
  methods: {
    chooseAction(type) {
      this.$store.dispatch("clickOnPanel", {
        type: type,
      });
      this.clearSimulationMode();
    },
    simulationMode() {
      this.$store.dispatch("startSimulation");
    },
    simulationProcess() {
      this.chooseAction("simulation");
      if (this.$store.state.layer) {
        const transitions = this.$store.state.transitions;
        const places = this.$store.state.places;
        const arcs = this.$store.state.arcs;
        for (let i = 0; i < transitions.length; i++) {
          for (let j = 0; j < arcs.length; j++) {
            if (arcs[j].sourceId === transitions[i].id) {
              const destinationArcFound = arcs.find(
                (el) => el.destinationId === transitions[i].id
              );
              if (!destinationArcFound) {
                const object = this.$store.state.layer.children.find(
                  (el) => el._id === transitions[i].id
                );
                object.fill("#22d481");
              }
            } else {
              for (let k = 0; k < places.length; k++) {
                if (arcs[j].sourceId === places[k].id && places[k].tokens > 0) {
                  const object = this.$store.state.layer.children.find(
                    (el) => el._id === arcs[j].destinationId
                  );
                  object.fill("#22d481");
                }
              }
            }
          }
        }
      }
    },
    clearSimulationMode() {
      const transitions = this.$store.state.transitions;
      if (transitions) {
        for (let i = 0; i < transitions.length; i++) {
          this.$store.state.layer.children
            .find((el) => el._id === transitions[i].id)
            .fill("white");
        }
      }
    },
  },
};
</script>

<style>
img {
  width: 1.7rem;
  border: solid 2px black;
  padding: 0.5rem;
  margin: 0.4rem;
  border-radius: 1rem;
  transition: 0.2s;
  background-color: rgb(237, 237, 237);
}

img:hover {
  transform: scale(1.15);
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

#topBar {
  margin: 0.25rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  opacity: 0;
  color: #000;
  text-align: center;
  border-radius: 2rem;
  padding: 5px;
  font-size: 50%;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.432);
  white-space: nowrap;

  /* Position the tooltip */
  position: absolute;
  z-index: 2;
  left: 170%;
  top: 30%;
  transition: 0.5s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 0.7;
  transform: scale(2);
  border-radius: 10px;
}
</style>
