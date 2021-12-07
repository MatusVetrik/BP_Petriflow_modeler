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
  drawSVG(state, payload) {
    state.canvas.add(payload);
    state.canvas.renderAll();
    console.log(state.canvas.getObjects());
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
  },
  deleteObject(state, payload) {
    console.log(state, payload);
  },
};
