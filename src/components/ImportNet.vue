<template>
  <img :src="importFile.src" alt="Import" @click="importXML()" />
</template>

<script>
export default {
  data() {
    return {
      importFile: {
        src: require("../assets/icons/open.svg"),
      },
      input: null,
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
      const data = this.input.files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        const convert = require("xml-js");
        const xml = e.target.result;
        const doc = convert.xml2json(xml, {
          compact: true,
          spaces: 4,
          ignoreDeclaration: true,
        });
        const arr = JSON.parse(doc);
        const transitions = arr.document.transitions;
        const places = arr.document.places;
        const arcs = arr.document.arcs;
        console.log(transitions, places, arcs);
      };
      reader.readAsText(data);
    },
  },
};
</script>

<style scoped>
input {
  position: absolute;
}
</style>
