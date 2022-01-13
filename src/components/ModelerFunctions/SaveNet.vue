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
        const file = new Blob([mergedJSON], { type: "text/plain" });
        a.href = URL.createObjectURL(file);
        a.download = title;
        a.click();
      }
    },
    downloadXML() {
      const title = prompt("Please enter file name:");
      if (title) {
        const transitions = this.$store.state.transitions;
        const places = this.$store.state.places;
        const arcs = this.$store.state.arcs;
        const o2x = require("object-to-xml");
        const obj = {
          '?xml version="1.0" encoding="UTF-8"?': null,
          document: {
            transitions,
            places,
            arcs,
          },
        };
        const a = document.createElement("a");
        const file = new Blob([o2x(obj)], { type: "text/plain" });
        a.href = URL.createObjectURL(file);
        a.download = title;
        a.click();
      }
    },
  },
};
</script>

<style scoped></style>
