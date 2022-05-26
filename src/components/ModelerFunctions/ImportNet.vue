<template>
  <img src="@/assets/icons/open.svg" alt="Import" @click="importXML()" />
</template>

<script>
import Konva from "konva";
import {getConnectorPoints} from "../../helper/helperFunctions.js";

export default {
  data() {
    return {
      input: null,
      transitions: null,
      places: null,
      arcs: null,
    };
  },

  methods: {
    importXML() {
      this.input = document.createElement("input");
      this.input.type = "file";
      this.input.click();
      this.input.addEventListener("change", this.loadXML);
    },
    loadXML(event) {
      event.preventDefault();
      this.$store.state.transitions = [];
      this.$store.state.places = [];
      this.$store.state.arcs = [];
      const data = this.input.files[0];
      var reader = new FileReader();
      reader.onload = (e) => {
        const convert = require("xml-js");
        const xml = e.target.result;
        const doc = convert.xml2json(xml, {
          compact: true,
          spaces: 4,
          ignoreDeclaration: true,
        });
        const arr = JSON.parse(doc);

        console.log(arr.document.transition);
        this.transitions =
          arr.document.transition && arr.document.transition.length
            ? new Array(...arr.document.transition)
            : new Array(arr.document.transition);
        this.places =
          arr.document.place && arr.document.place.length
            ? new Array(...arr.document.place)
            : new Array(arr.document.place);
        this.arcs =
          arr.document.arc && arr.document.arc.length
            ? new Array(...arr.document.arc)
            : new Array(arr.document.arc);

        if (this.transitions[0]) this.loadTransitions();
        if (this.places[0]) this.loadPlaces();
        if (this.arcs[0]) this.loadArcs();
      };
      reader.readAsText(data);
      this.$store.state.layer.destroyChildren();
    },
    loadTransitions() {
      for (let i = 0; i < this.transitions.length; i++) {
        this.$store.dispatch("drawTransition", {
          event: {
            clientX: parseInt(this.transitions[i].x._text),
            clientY: parseInt(this.transitions[i].y._text),
          },
          stage: this.$store.state.stage,
          layer: this.$store.state.layer,
          label: this.transitions[i].label._text,
          visibility: true,
        });
      }
    },
    loadPlaces() {
      for (let i = 0; i < this.places.length; i++) {
        this.$store.dispatch("drawPlace", {
          event: {
            clientX: parseInt(this.places[i].x._text),
            clientY: parseInt(this.places[i].y._text),
          },
          stage: this.$store.state.stage,
          layer: this.$store.state.layer,
          label: this.places[i].label._text,
          tokens: parseInt(this.places[i].tokens._text),
          visibility: parseInt(this.places[i].tokens._text) > 0 ? true : false,
        });
      }
    },
    loadArcs() {
      for (let i = 0; i < this.arcs.length; i++) {
        let startEl = this.transitions.find(
          (el) => el.id._text === this.arcs[i].sourceId._text
        );
        let startElNew;
        if (!startEl) {
          startEl = this.places.find(
            (el) => el.id._text === this.arcs[i].sourceId._text
          );
          startElNew = this.findNewElement(this.$store.state.places, startEl);
        } else {
          startElNew = this.findNewElement(
            this.$store.state.transitions,
            startEl
          );
        }
        let endEl = this.transitions.find(
          (el) => el.id._text === this.arcs[i].destinationId._text
        );
        let endElNew;
        if (!endEl) {
          endEl = this.places.find(
            (el) => el.id._text === this.arcs[i].destinationId._text
          );
          endElNew = this.findNewElement(this.$store.state.places, endEl);
        } else {
          endElNew = this.findNewElement(this.$store.state.transitions, endEl);
        }
        const arrow = this.createArrow(startElNew, endElNew);

        this.$store.dispatch("addArc", {
          layer: this.$store.state.layer,
          id: arrow._id,
          start: parseInt(startElNew.id),
          end: parseInt(endElNew.id),
          startXY: {x: startElNew.x, y: startElNew.y},
          endXY: {x: endElNew.x, y: endElNew.y},
          multiplicityLabel: parseInt(this.arcs[i].multiplicity._text),
          multiplicity: parseInt(this.arcs[i].multiplicity._text),
          labelVisibility:
            parseInt(this.arcs[i].multiplicity._text) > 1 ? true : false,
        });
      }
    },
    findNewElement(objects, element) {
      return objects.find((el) => this.isCorrectElement(el, element));
    },
    isCorrectElement(currentElement, element) {
      return (
        currentElement.x === parseInt(element.x._text) &&
        currentElement.y === parseInt(element.y._text)
      );
    },
    createArrow(startElNew, endElNew) {
      const arrow = new Konva.Arrow({
        points: getConnectorPoints(
          {x: parseInt(startElNew.x), y: parseInt(startElNew.y)},
          {x: parseInt(endElNew.x), y: parseInt(endElNew.y)}
        ),
        stroke: "black",
        strokeWidth: 2,
        hitStrokeWidth: 10,
        fill: "black",
      });
      arrow.on("mouseover touchstart", function () {
        this.stroke("#00a2ec");
      });
      arrow.on("mouseout touchend", function () {
        this.stroke("black");
      });
      this.$store.state.layer.add(arrow);
      return arrow;
    },
  },
};
</script>

<style scoped>
input {
  position: absolute;
}
</style>
