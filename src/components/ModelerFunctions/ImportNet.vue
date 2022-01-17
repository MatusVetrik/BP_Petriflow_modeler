<template>
  <img src="@/assets/icons/open.svg" alt="Import" @click="importXML()" />
</template>

<script>
import Konva from "konva";

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

        this.transitions = arr.document.transitions;
        this.places = arr.document.places;
        this.arcs = arr.document.arcs;
        this.loadTransitions();
        this.loadPlaces();
        this.loadArcs();
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
      console.log("Arcs");
      for (let i = 0; i < this.arcs.length; i++) {
        let startEl = this.transitions.find(
          (el) => el.id._text === this.arcs[i].sourceId._text
        );
        let startElNew;
        if (!startEl) {
          startEl = this.places.find(
            (el) => el.id._text === this.arcs[i].sourceId._text
          );
          startElNew = this.$store.state.places.find(
            (el) =>
              el.x === parseInt(startEl.x._text) &&
              el.y === parseInt(startEl.y._text)
          );
        } else {
          startElNew = this.$store.state.transitions.find(
            (el) =>
              el.x === parseInt(startEl.x._text) &&
              el.y === parseInt(startEl.y._text)
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
          endElNew = this.$store.state.places.find(
            (el) =>
              el.x === parseInt(endEl.x._text) &&
              el.y === parseInt(endEl.y._text)
          );
        } else {
          endElNew = this.$store.state.transitions.find(
            (el) =>
              el.x === parseInt(endEl.x._text) &&
              el.y === parseInt(endEl.y._text)
          );
        }
        const arrow = this.createArrow(startElNew, endElNew);

        this.$store.dispatch("addArc", {
          layer: this.$store.state.layer,
          id: arrow._id,
          start: parseInt(startElNew.id),
          end: parseInt(endElNew.id),
          startXY: { x: startElNew.x, y: startElNew.y },
          endXY: { x: endElNew.x, y: endElNew.y },
          multiplicityLabel: parseInt(this.arcs[i].multiplicity._text),
          multiplicity: parseInt(this.arcs[i].multiplicity._text),
          labelVisibility:
            parseInt(this.arcs[i].multiplicity._text) > 1 ? true : false,
        });
      }
    },
    createArrow(startElNew, endElNew) {
      const arrow = new Konva.Arrow({
        points: this.getConnectorPoints(
          { x: parseInt(startElNew.x), y: parseInt(startElNew.y) },
          { x: parseInt(endElNew.x), y: parseInt(endElNew.y) }
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
    getConnectorPoints(from, to) {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      let angle = Math.atan2(-dy, dx);

      const radius = 23;

      return [
        from.x + -radius * Math.cos(angle + Math.PI),
        from.y + radius * Math.sin(angle + Math.PI),
        to.x + -radius * Math.cos(angle),
        to.y + radius * Math.sin(angle),
      ];
    },
  },
};
</script>

<style scoped>
input {
  position: absolute;
}
</style>
