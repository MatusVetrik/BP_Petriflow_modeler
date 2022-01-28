<template>
  <img src="@/assets/icons/fire.svg" alt="Start Simulation" />
</template>

<script>
import Konva from "konva";
export default {
  data() {
    return {
      servedPlaces: [],
      transtions: null,
      places: null,
      arcs: null,
    };
  },
  methods: {
    simulationProcess(event) {
      if (this.simulationClicked() && event.target instanceof Konva.Rect) {
        this.transitions = this.$store.state.transitions;
        this.places = this.$store.state.places;
        this.arcs = this.$store.state.arcs;
        const target = this.transitions.find(
          (el) => el.id === event.target._id
        );
        const targetDestinantionBlank = this.$store.state.arcs.find(
          (el) => el.destinationId === event.target._id
        );
        if (!targetDestinantionBlank) {
          this.destinationWithoutSource(target);
        } else {
          this.servedPlaces = [];
          for (let i = 0; i < this.arcs.length; i++) {
            if (this.arcs[i].destinationId === target.id) {
              const sourcePlace = this.places.find(
                (el) => el.id === this.arcs[i].sourceId
              );
              if (
                sourcePlace.tokens > 0 &&
                sourcePlace.tokens >= this.arcs[i].multiplicity
                // && event.target.attrs.fill === "#22d481"
              ) {
                console.log(event.target);
                this.subtractSourceTokensAndAddToDestination(
                  sourcePlace,
                  target,
                  i
                );
              }
            }
          }
        }
        this.simulationRound();
      }
    },
    destinationWithoutSource(target) {
      for (let i = 0; i < this.arcs.length; i++) {
        if (this.arcs[i].sourceId === target.id) {
          const sourcePlace = this.places.find(
            (el) => el.id === this.arcs[i].destinationId
          );
          sourcePlace.tokens += this.arcs[i].multiplicity;

          const labelForChange = this.$store.state.layer.children.find(
            (el) => el._id === sourcePlace.tokenLabel
          );
          labelForChange.getText().text(sourcePlace.tokens);
          labelForChange.visible(true);
        }
      }
    },
    subtractSourceTokensAndAddToDestination(sourcePlace, target, i) {
      sourcePlace.tokens -= this.arcs[i].multiplicity;

      for (let j = 0; j < this.arcs.length; j++) {
        if (this.arcs[j].sourceId === target.id) {
          for (let k = 0; k < this.places.length; k++) {
            if (
              this.arcs[j].destinationId === this.places[k].id &&
              !this.servedPlaces.find((el) => el === this.places[k].id)
            ) {
              this.places[k].tokens += this.arcs[j].multiplicity;
              const labelForChange = this.$store.state.layer.children.find(
                (el) => el._id === this.places[k].tokenLabel
              );
              labelForChange.getText().text(this.places[k].tokens);
              labelForChange.visible(true);
              this.servedPlaces.push(this.places[k].id);
            }
          }
        }
      }

      const labelForChange = this.$store.state.layer.children.find(
        (el) => el._id === sourcePlace.tokenLabel
      );
      if (this.arcs[i].multiplicity > sourcePlace.tokens) {
        this.noTokensInPlace(sourcePlace, labelForChange);
      } else labelForChange.getText().text(sourcePlace.tokens);
    },
    noTokensInPlace(sourcePlace, labelForChange) {
      for (let i = 0; i < this.transitions.length; i++) {
        for (let j = 0; j < this.arcs.length; j++) {
          if (
            this.arcs[j].sourceId === sourcePlace.id &&
            this.arcs[j].destinationId === this.transitions[i].id
          ) {
            const foundEl = this.$store.state.layer.children.find(
              (el) => el._id === this.transitions[i].id
            );
            foundEl.fill("white");
          }
        }
      }
      sourcePlace.tokens > 0
        ? labelForChange.getText().text(sourcePlace.tokens)
        : labelForChange.getText().text("");
    },
    simulationRound() {
      if (this.$store.state.layer) {
        const transitions = this.$store.state.transitions;
        const places = this.$store.state.places;
        const arcs = this.$store.state.arcs;
        for (let i = 0; i < transitions.length; i++) {
          let otherPlaceWithoutMarks = false;
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
                if (arcs[j].sourceId === places[k].id) {
                  const object = this.$store.state.layer.children.find(
                    (el) => el._id === arcs[j].destinationId
                  );
                  if (
                    places[k].tokens > 0 &&
                    places[k].tokens >= arcs[j].multiplicity
                  ) {
                    object.fill("#22d481");
                  } else {
                    object.fill("#ffffff");
                    otherPlaceWithoutMarks = true;
                    break;
                  }
                }
              }
            }
            if (otherPlaceWithoutMarks) {
              break;
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
