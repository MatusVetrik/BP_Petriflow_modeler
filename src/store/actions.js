import Konva from "konva";

export default {
  setCanvas(context, payload) {
    context.commit("setCanvas", payload);
  },
  clickOnPanel(context, payload) {
    context.commit("clickOnPanel", payload);
  },
  drawTransition(context, payload) {
    addTransition(payload);
    context.commit("pushTransition", payload);
  },
  drawPlace(context, payload) {
    addPlace(payload);
    context.commit("pushPlace", payload);
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

const addPlace = (payload) => {
  const place = new Konva.Circle({
    x: payload.event.clientX,
    y: payload.event.clientY,
    radius: 20,
    fill: null,
    stroke: "black",
    strokeWidth: 3,
    draggable: false,
  });
  addLabel(payload, place, 1, -10, -14);
};

const addTransition = (payload) => {
  const transition = new Konva.Rect({
    x: payload.event.clientX - 20,
    y: payload.event.clientY - 20,
    width: 40,
    height: 40,
    fill: null,
    stroke: "black",
    strokeWidth: 3,
    draggable: true,
  });
  addLabel(payload, transition, "Transtition", -40, 20);
};

const addLabel = (payload, object, innerText, offsetX, offsetY) => {
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
    })
  );
  payload.layer.add(object).add(label);
};

// const addArc = (payload) => {
//   let stage = payload.stage;
//   let layer = payload.layer;
//   let
// };
