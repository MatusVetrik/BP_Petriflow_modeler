import Konva from "konva";

export default {
  setCanvas(context, payload) {
    context.commit("setCanvas", payload);
  },
  clickOnPanel(context, payload) {
    context.commit("clickOnPanel", payload);
  },
  drawTransition(context, payload) {
    addTransition(context, payload);
  },
  drawPlace(context, payload) {
    addPlace(context, payload);
  },
  drawArc(context, payload) {
    // addArc(payload);
    context.commit("pushArc", payload);
  },
  deleteObject(context, payload) {
    // const ctx = payload.canvas.getContext("2d");
    context.commit("deleteObject", payload);
  },
  addTokens(context, payload) {
    payload.layer.on("click", function (event) {
      let object = event.target;
      console.log("CLICK", object);
    });
    // context.commit("addTokens", payload);
  },
};

const addPlace = (context, payload) => {
  const place = new Konva.Circle({
    x: payload.event.clientX,
    y: payload.event.clientY,
    radius: 20,
    fill: "white",
    stroke: "black",
    strokeWidth: 3,
    draggable: false,
  });
  // addLabel(context, payload, place, 1, -8, 18);
  payload.layer.add(place);
  // place.zIndex(1);
  context.commit("pushPlace", { payload: payload, id: place._id });
};

const addTransition = (context, payload) => {
  const transition = new Konva.Rect({
    x: payload.event.clientX - 20,
    y: payload.event.clientY - 20,
    width: 40,
    height: 40,
    fill: null,
    stroke: "black",
    strokeWidth: 3,
  });
  payload.layer.add(transition);
  // transition.zIndex(1);
  addLabel(context, payload, transition, "Transtition", -40, 20);
  context.commit("pushTransition", { payload: payload, id: transition._id });
};

const addLabel = (context, payload, object, innerText, offsetX, offsetY) => {
  const label = new Konva.Label({
    x: payload.event.clientX + offsetX,
    y: payload.event.clientY + offsetY,
    opacity: 1,
  });
  label.add(
    new Konva.Text({
      text: innerText,
      fontFamily: "Calibri",
      fontSize: 18,
      padding: 5,
      fill: "black",
      objectId: context.state.count + "",
    })
  );
  payload.layer.add(label);
};
