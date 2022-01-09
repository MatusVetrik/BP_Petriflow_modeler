<template>
  <img :src="importFile.src" alt="Import" @click="importXML()" />
</template>

<script>
import Konva from "konva";

export default {
  data() {
    return {
      importFile: {
        src: require("../assets/icons/open.svg"),
      },
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
          visibility: true,
        });
      }
    },
    loadArcs() {
      console.log("Arcs");
      for (let i = 0; i < this.arcs.length; i++) {
        let startEl = this.transitions.find(
          (el) => el.id._text === this.arcs[i].sourceId._text
        );
        if (!startEl) {
          startEl = this.places.find(
            (el) => el.id._text === this.arcs[i].sourceId._text
          );
        }
        let endEl = this.transitions.find(
          (el) => el.id._text === this.arcs[i].destinationId._text
        );
        if (!endEl) {
          endEl = this.places.find(
            (el) => el.id._text === this.arcs[i].destinationId._text
          );
        }
        console.log(startEl, endEl);
        const arrow = new Konva.Arrow({
          points: this.getConnectorPoints(
            { x: parseInt(startEl.x._text), y: parseInt(startEl.y._text) },
            { x: parseInt(endEl.x._text), y: parseInt(endEl.y._text) }
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

        this.$store.dispatch("addArc", {
          layer: this.$store.state.layer,
          id: arrow._id,
          start: parseInt(startEl.id._text),
          end: parseInt(endEl.id._text),
          startXY: { x: startEl.x, y: startEl.y },
          endXY: { x: endEl.x, y: endEl.y },
          multiplicity: this.arcs[i].multiplicity._text,
          labelVisibility: true,
        });
      }
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
