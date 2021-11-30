export default {
  setCanvas(state, payload) {
    state.canvas = payload;
  },
  clickOnPanel(state, payload) {
    state.clicked = {
      url: payload.url,
      type: payload.type,
    };
    console.log(state.clicked);
  },
  pushTransition(state, payload) {
    state.count++;
    state.transitions.push({
      id: state.count,
      x: payload.event.clientX,
      y: payload.event.clientY,
      layout: {
        offset: 0,
      },
      label: "Transition",
    });
    console.log(state.transitions);
  },
  pushPlace(state, payload) {
    state.count++;
    state.places.push({
      id: state.count,
      x: payload.event.clientX,
      y: payload.event.clientY,
      label: "Place",
      tokens: 0,
      static: false,
    });
    console.log(state.places);
  },
  pushArc(state, payload) {
    state.count++;
    state.arcs.push({
      id: state.count,
      type: "regular",
      sourceId: payload.event.clientX,
      destinationId: payload.event.clientY,
      multiplicity: 0,
    });
    console.log(state.arcs);
  },
};
