<template>
  <img src="@/assets/icons/save.svg" alt="Save" @click="downloadXML" />
</template>

<script>
export default {
  methods: {
    downloadJSON() {
      const title = prompt("Please enter file name:");
      if (title) {
        const transitions = this.$store.state.transitions;
        const places = this.$store.state.places;
        const arcs = this.$store.state.arcs;
        const mergedJSON = JSON.stringify(transitions.concat(places, arcs));
        const a = document.createElement("a");
        const file = new Blob([mergedJSON], {type: "text/plain"});
        a.href = URL.createObjectURL(file);
        a.download = title;
        a.click();
      }
    },
    downloadXML() {
      const title = prompt("Please enter file name:");
      if (title) {
        const rawTransitions = this.$store.state.transitions;
        const rawPlaces = this.$store.state.places;
        const rawArcs = this.$store.state.arcs;
        const o2x = require("object-to-xml");
        const petriInfo = {
          id: "new_model",
          initials: "NEW",
          title: "New Model",
          defaultRole: true,
          transitionRole: false,
        };

        const transition = rawTransitions.map((el) => {
          return {
            id: el.id,
            x: el.x,
            y: el.y,
            label: el.label,
          };
        });

        const place = rawPlaces.map((el) => {
          return {
            id: el.id,
            x: el.x,
            y: el.y,
            label: el.label,
            tokens: el.tokens,
            static: el.static,
          };
        });

        const arc = rawArcs.map((el) => {
          return {
            id: el.id,
            type: el.type,
            sourceId: el.sourceId,
            destinationId: el.destinationId,
            multiplicity: el.multiplicity,
          };
        });

        const obj = {
          '?xml version="1.0" encoding="UTF-8"?': null,
          'document xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://modeler.netgrif.com/petriflow_schema.xsd"':
            {
              ...petriInfo,
              transition,
              place,
              arc,
            },
        };
        const a = document.createElement("a");
        const file = new Blob([o2x(obj)], {type: "text/plain"});
        a.href = URL.createObjectURL(file);
        a.download = title;
        a.click();
      }
    },
  },
};
</script>

<style scoped></style>
