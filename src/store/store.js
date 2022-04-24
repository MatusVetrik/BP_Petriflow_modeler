import {createStore} from "vuex";

import actions from "./actions";
import mutations from "./mutations";

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
});

export default store;
