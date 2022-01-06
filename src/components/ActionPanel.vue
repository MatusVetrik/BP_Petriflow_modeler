<template>
  <div id="topBar">
    <img
      :src="transition.src"
      alt="Transtition"
      @click="chooseAction('transition')"
    />
    <img :src="place.src" alt="Place" @click="chooseAction('place')" />
    <change-tokens />
    <change-label @click="chooseAction('change')" />
    <draw-arc @click="chooseAction('arc')" />
    <change-weight @click="chooseAction('arcWeight')" />
    <delete-object @click="chooseAction('delete')" />
    <save-net @click="chooseAction('save')" />
    <start-simulation
      @mousedown="chooseAction('simulation')"
      @click="simulationProcess()"
    />
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
</style>
