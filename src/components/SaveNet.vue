<template>
  <img :src="save.src" alt="Save" />
</template>

<script>
export default {
  data() {
    return {
      save: {
        src: require("../assets/icons/save.svg"),
      },
    };
  },
  methods: {
    saveURL(event) {
      if (this.saveURLClicked()) {
        console.log("SAVE URL");
        event;
      }
    },
    saveURLClicked() {
      if (this.$store.state.clicked.type === "save") return true;
      return false;
    },
  },
  mounted() {
    this.$store.state.stage.on("mousedown", (event) => {
      this.saveURL(event);
    });
  },
};
</script>

<style scoped></style>
