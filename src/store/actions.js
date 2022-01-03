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
  addArc(context, payload) {
    const labelX = (payload.endXY.x + payload.startXY.x) / 2;
    const labelY = (payload.endXY.y + payload.startXY.y) / 2;
    const label = addLabel(labelX - 10, labelY - 10, "", 0, 0);
    payload.layer.add(label);
    context.commit("pushArc", {
      id: payload.id,
      start: payload.start,
      end: payload.end,
      labelId: label._id,
    });
  },
  deleteObject(context, payload) {
    // const ctx = payload.canvas.getContext("2d");
    context.commit("deleteObject", payload);
  },
  addTokens(context, payload) {
    // payload.layer.on("click", function (event) {
    //   let object = event.target;
    // });
    // context.commit("addTokens", payload);
    context, payload;
  },
};

const addPlace = (context, payload) => {
  const place = new Konva.Circle({
    x: payload.event.clientX,
    y: payload.event.clientY,
    radius: 20,
    fill: "white",
    stroke: "black",
    strokeWidth: 2,
    draggable: false,
  });
  const label = addLabel(
    payload.event.clientX,
    payload.event.clientY,
    "",
    -19,
    18
  );
  payload.layer.add(label);
  payload.layer.add(place);
  addHoverEffect(place);
  context.commit("pushPlace", {
    payload: payload,
    id: place._id,
    label: label._id,
  });
};

const addTransition = (context, payload) => {
  const transition = new Konva.Rect({
    x: payload.event.clientX - 20,
    y: payload.event.clientY - 20,
    width: 40,
    height: 40,
    fill: null,
    stroke: "black",
    strokeWidth: 2,
  });
  const label = addLabel(
    payload.event.clientX,
    payload.event.clientY,
    "",
    -50,
    20,
    100
  );
  payload.layer.add(label);
  payload.layer.add(transition);
  addHoverEffect(transition);
  context.commit("pushTransition", {
    payload: payload,
    id: transition._id,
    label: label._id,
  });
};

const addHoverEffect = (object) => {
  object.on("mouseover touchstart", function () {
    this.stroke("#00a2ec");
  });
  object.on("mouseout touchend", function () {
    this.stroke("black");
  });
};

const addLabel = (x, y, innerText, offsetX, offsetY, width = 40) => {
  const label = new Konva.Label({
    x: x + offsetX,
    y: y + offsetY,
    opacity: 1,
  });
  label.add(
    new Konva.Text({
      text: innerText,
      fontFamily: "Calibri",
      fontSize: 18,
      padding: 5,
      width: width,
      fill: "black",
      align: "center",
      wrap: "word",
    })
  );
  return label;
};
