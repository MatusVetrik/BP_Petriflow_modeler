<template>
  <div id="topBar">
    <img
      :src="transition.src"
      alt="Transtition"
      @click="chooseAction(transition.url, 'transition')"
    />
    <img
      :src="place.src"
      alt="Place"
      @click="chooseAction(place.url, 'place')"
    />
    <img :src="addTokens.src" alt="Add Token" @click="chooseAction(null)" />
    <img
      :src="removeTokens.src"
      alt="Remove Token"
      @click="chooseAction(null)"
    />
    <img
      :src="changeMarking.src"
      alt="Change Marking"
      @click="chooseAction(null)"
    />
    <img
      :src="changeLabel.src"
      alt="Change Label"
      @click="chooseAction(null)"
    />
    <img :src="arc.src" alt="Arc" @click="chooseAction(arc.url, 'arc')" />
    <img :src="arcWeight.src" alt="Arc Weight" @click="chooseAction(null)" />
    <img :src="deleteNode.src" alt="Delete Node" @click="chooseAction(null)" />
    <img :src="save.src" alt="Save" @click="chooseAction(null)" />
    <img
      :src="startSimulation.src"
      alt="Start Simulation"
      @click="chooseAction(null)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      transition: {
        src: require("../assets/icons/transition.svg"),
        url: "../assets/icons/transition.svg",
      },
      place: {
        src: require("../assets/icons/place.svg"),
        url: "../assets/icons/place.svg",
      },
      addTokens: {
        src: require("../assets/icons/addtokens.svg"),
        url: "../assets/icons/addtokens.svg",
      },
      removeTokens: {
        src: require("../assets/icons/removetokens.svg"),
        url: "../assets/icons/removetokens.svg",
      },
      changeMarking: {
        src: require("../assets/icons/marking.svg"),
        url: "../assets/icons/marking.svg",
      },
      changeLabel: {
        src: require("../assets/icons/label.svg"),
        url: "../assets/icons/label.svg",
      },
      arc: {
        src: require("../assets/icons/arc.svg"),
        url: "../assets/icons/arc.svg",
      },
      arcWeight: {
        src: require("../assets/icons/arcweight.svg"),
        url: "../assets/icons/arcweight.svg",
      },
      deleteNode: {
        src: require("../assets/icons/delete.svg"),
        url: "../assets/icons/delete.svg",
      },
      move: {
        src: require("../assets/icons/move.svg"),
        url: "../assets/icons/move.svg",
      },
      startSimulation: {
        src: require("../assets/icons/fire.svg"),
        url: "../assets/icons/fire.svg",
      },
      save: {
        src: require("../assets/icons/save.svg"),
        url: "../assets/icons/save.svg",
      },
    };
  },
  methods: {
    chooseAction(action, type) {
      this.$store.dispatch("clickOnPanel", {
        url: action,
        type: type,
      });
    },
    // drawArc(action, type) {
    //   this.$store.dispatch("drawArc", {
    //     url: action,
    //     type: type,
    //   });
    // },
  },
};
</script>

<style scoped>
img {
  width: 2rem;
  border: solid 2px black;
  padding: 0.5rem;
  margin: 0.5rem;
  transition: 0.2s;
  background-color: rgba(240, 240, 240, 0.4);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.108);
}

img:hover {
  transform: scale(1.05);
  background-color: rgba(220, 220, 220, 0.4);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.313);
}

#topBar {
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
}
</style>
