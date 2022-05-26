<template>
  <img src="@/assets/icons/fire.svg" alt="Start Simulation" />
</template>

<script>
import Konva from "konva";
import {
  whatOperationWasClicked,
  reactToActivatedOperation,
} from "../../helper/helperFunctions";

export default {
  data() {
    return {
      servedPlaces: [],
      transtions: null,
      places: null,
      arcs: null,
      countSourcePlaces: 0,
      servedSourcePlaces: 0,
    };
  },
  methods: {
    simulationProcess(event) {
      if (
        whatOperationWasClicked(this.$store.state.clicked.type, "simulation") &&
        event.target instanceof Konva.Rect
      ) {
        this.transitions = this.$store.state.transitions;
        this.places = this.$store.state.places;
        this.arcs = this.$store.state.arcs;
        const target = this.transitions.find(
          (el) => el.id === event.target._id
        );
        this.countSourcePlaces =
          this.placesConnectedWithTransition(target).length;

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
                sourcePlace.tokens >= this.arcs[i].multiplicity &&
                event.target.attrs.fill === "#22d481"
              ) {
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
      this.servedSourcePlaces++;

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
      if (
        this.arcs[i].multiplicity > sourcePlace.tokens &&
        this.servedSourcePlaces === this.countSourcePlaces
      ) {
        this.noTokensInPlace(sourcePlace);
      }
      sourcePlace.tokens > 0
        ? labelForChange.getText().text(sourcePlace.tokens)
        : labelForChange.getText().text("");
    },
    noTokensInPlace(sourcePlace) {
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
    },
    placesConnectedWithTransition(trans) {
      const arcs = this.arcs
        .map((el) => (el.destinationId === trans.id ? el : ""))
        .filter(String);
      return arcs;
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
                    break;
                  }
                }
              }
            }
          }
        }
      }
    },
  },
  mounted() {
    reactToActivatedOperation(this.$store.state.stage, this.simulationProcess);
  },
};
</script>

<style scoped></style>
