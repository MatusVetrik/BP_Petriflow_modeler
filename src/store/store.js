import { createStore } from "vuex";

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const store = createStore({
  state() {
    return {
      stage: null,
      layer: null,
      clicked: {
        url: "",
        type: "",
      },
      transitions: [],
      places: [],
      arcs: [],
    };
  },
  actions,
  mutations,
  getters,
});

export default store;
