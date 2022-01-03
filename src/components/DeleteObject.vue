<template>
  <img :src="deleteNode.src" alt="Delete Node" />
</template>

<script>
export default {
  data() {
    return {
      deleteNode: {
        src: require("../assets/icons/delete.svg"),
      },
    };
  },
  methods: {
    deleteObject(event) {
      if (this.deleteObjectClicked()) {
        const object = this.$store.state.layer.children.find(
          (el) => el._id === event.target._id
        );
        if (object) {
          const transitions = this.$store.state.transitions.filter(
            (el) => el.id !== event.target._id
          );
          const places = this.$store.state.places.filter(
            (el) => el.id !== event.target._id
          );
          const storedArcs = this.$store.state.arcs;
          let arcs = [];
          for (let i = 0; i < storedArcs.length; i++) {
            if (
              storedArcs[i].sourceId === event.target._id ||
              storedArcs[i].destinationId === event.target._id
            ) {
              const arcToDestory = this.$store.state.layer.children.find(
                (el) => el._id === storedArcs[i].id
              );
              arcToDestory.destroy();
            } else {
              arcs.push(storedArcs[i]);
            }
          }
          this.$store.state.transitions = transitions;
          this.$store.state.places = places;
          this.$store.state.arcs = arcs;
          object.destroy();
          console.log(arcs);
        }
        // this.$store.state.layer.batchDraw();
      }
    },
    deleteObjectClicked() {
      if (this.$store.state.clicked.type === "delete") return 1;
      return 0;
    },
  },
  mounted() {
    this.$store.state.stage.on("mousedown", (event) => {
      this.deleteObject(event);
    });
  },
};
</script>

<style scoped></style>
