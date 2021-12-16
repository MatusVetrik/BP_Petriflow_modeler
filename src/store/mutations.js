export default {
  setStage(state, payload) {
    state.stage = payload;
  },
  clickOnPanel(state, payload) {
    state.clicked = {
      url: payload.url,
      type: payload.type,
    };
  },
  pushTransition(state, payload) {
    state.transitions.push({
      id: payload.id,
      x: payload.payload.event.clientX,
      y: payload.payload.event.clientY,
      layout: {
        offset: 0,
      },
      label: "Transition",
    });
  },
  pushPlace(state, payload) {
    state.places.push({
      id: payload.id,
      x: payload.payload.event.clientX,
      y: payload.payload.event.clientY,
      label: "Place",
      tokens: 0,
      static: false,
    });
    console.log(state.places);
  },
  pushArc(state, payload) {
    state.arcs.push({
      id: payload.id,
      type: "regular",
      sourceId: payload.start,
      destinationId: payload.end,
      multiplicity: 0,
    });
    console.log(state.arcs);
  },
  deleteObject(state, payload) {
    console.log(state, payload);
  },
  // addTokens(state,payload){
  //   state.
  // }
};
