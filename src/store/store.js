import {createStore} from "vuex";

import actions from "@/store/actions";
import mutations from "@/store/mutations";

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
