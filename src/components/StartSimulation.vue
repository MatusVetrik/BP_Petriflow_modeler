<template>
  <img :src="startSimulation.src" alt="Start Simulation" />
</template>

<script>
import Konva from "konva";
export default {
  data() {
    return {
      startSimulation: {
        src: require("../assets/icons/fire.svg"),
      },
      used: false,
      servedPlaces: [],
    };
  },
  methods: {
    simulationProcess(event) {
      if (this.simulationClicked() && event.target instanceof Konva.Rect) {
        const transitions = this.$store.state.transitions;
        const places = this.$store.state.places;
        const arcs = this.$store.state.arcs;
        const target = transitions.find((el) => el.id === event.target._id);
        const targetDestinantionBlank = arcs.find(
          (el) => el.destinationId === event.target._id
        );
        console.log(targetDestinantionBlank);
        if (!targetDestinantionBlank) {
          for (let i = 0; i < arcs.length; i++) {
            if (arcs[i].sourceId === target.id) {
              const sourcePlace = places.find(
                (el) => el.id === arcs[i].destinationId
              );
              sourcePlace.tokens += arcs[i].multiplicity;
              const labelForChange = this.$store.state.layer.children.find(
                (el) => el._id === sourcePlace.tokenLabel
              );
              labelForChange.getText().text(sourcePlace.tokens);
            }
          }
        } else {
          this.servedPlaces = [];
          for (let i = 0; i < arcs.length; i++) {
            if (arcs[i].destinationId === target.id) {
              const sourcePlace = places.find(
                (el) => el.id === arcs[i].sourceId
              );
              if (sourcePlace.tokens > 0) {
                sourcePlace.tokens -= arcs[i].multiplicity;

                for (let j = 0; j < arcs.length; j++) {
                  if (arcs[j].sourceId === target.id) {
                    for (let k = 0; k < places.length; k++) {
                      if (
                        arcs[j].destinationId === places[k].id &&
                        !this.servedPlaces.find((el) => el === places[k].id)
                      ) {
                        places[k].tokens += arcs[j].multiplicity;
                        const labelForChange =
                          this.$store.state.layer.children.find(
                            (el) => el._id === places[k].tokenLabel
                          );
                        labelForChange.getText().text(places[k].tokens);
                        this.servedPlaces.push(places[k].id);
                      }
                    }
                  }
                }

                const labelForChange = this.$store.state.layer.children.find(
                  (el) => el._id === sourcePlace.tokenLabel
                );
                if (sourcePlace.tokens === 0) {
                  labelForChange.getText().text("");
                  event.target.fill("white");
                } else labelForChange.getText().text(sourcePlace.tokens);
              }
            }
          }
        }
        this.simulationRound();
      }
    },
    simulationRound() {
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
    simulationClicked() {
      if (this.$store.state.clicked.type === "simulation") return true;
      return false;
    },
  },
  mounted() {
    this.$store.state.stage.on("mousedown", (event) => {
      this.simulationProcess(event);
    });
  },
};
</script>

<style scoped></style>
