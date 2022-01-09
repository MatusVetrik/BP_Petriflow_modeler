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
      label: "",
      labelId: payload.label,
    });
  },
  pushPlace(state, payload) {
    state.places.push({
      id: payload.id,
      x: payload.payload.event.clientX,
      y: payload.payload.event.clientY,
      label: "",
      labelId: payload.labelTag,
      tokens: payload.tokens,
      tokenLabel: payload.label,
      static: false,
    });
  },
  pushArc(state, payload) {
    state.arcs.push({
      id: payload.id,
      type: "regular",
      sourceId: payload.start,
      destinationId: payload.end,
      multiplicity: 1,
      labelId: payload.labelId,
    });
  },
};
