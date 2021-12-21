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
    <img
      :src="addTokens.src"
      alt="Add Token"
      @click="chooseAction(addTokens.url, 'addTokens')"
    />
    <img
      :src="removeTokens.src"
      alt="Remove Token"
      @click="chooseAction(removeTokens.url, 'removeTokens')"
    />
    <img
      :src="changeLabel.src"
      alt="Change Label"
      @click="chooseAction(changeLabel.url, 'change')"
    />
    <img
      :src="arc.src"
      alt="Arc"
      class="arc"
      @click="chooseAction(arc.url, 'arc')"
    />
    <img
      :src="arcWeight.src"
      alt="Arc Weight"
      class="arc"
      @click="chooseAction(arcWeight.url, 'arcWeight')"
    />
    <img
      :src="deleteNode.src"
      alt="Delete Node"
      @click="chooseAction(deleteNode.url, 'delete')"
    />
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
  width: 1.7rem;
  border: solid 2px black;
  padding: 0.5rem;
  margin: 0.4rem;
  border-radius: 1rem;
  transition: 0.2s;
  background-color: rgb(237, 237, 237);
}

img:hover {
  transform: scale(1.15);
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

#topBar {
  margin: 0.25rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
