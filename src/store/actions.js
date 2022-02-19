import Konva from "konva";

export default {
  setCanvas(context, payload) {
    context.commit("setCanvas", payload);
  },
  clickOnPanel(context, payload) {
    context.commit("clickOnPanel", payload);
  },
  drawTransition(context, payload) {
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
      payload.label,
      -50,
      25,
      100,
      true
    );
    // transition._id = new Date().getTime();
    payload.layer.add(label);
    payload.layer.add(transition);
    addHoverEffect(transition);
    context.commit("pushTransition", {
      payload: payload,
      id: transition._id,
      label: label._id,
    });
  },
  drawPlace(context, payload) {
    const place = new Konva.Circle({
      x: payload.event.clientX,
      y: payload.event.clientY,
      radius: 20,

      stroke: "black",
      strokeWidth: 2,
      draggable: false,
    });
    const labelTokens = addLabel(
      payload.event.clientX,
      payload.event.clientY,
      payload.tokens,
      -20,
      -9,
      40,
      payload.visibility
    );
    const labelTag = addLabel(
      payload.event.clientX,
      payload.event.clientY,
      payload.label,
      -50,
      25,
      100,
      true
    );
    payload.layer.add(labelTokens);
    payload.layer.add(labelTag);
    labelTokens.zIndex(0);
    payload.layer.add(place);
    addHoverEffect(place);
    context.commit("pushPlace", {
      payload: payload,
      id: place._id,
      label: labelTokens._id,
      labelTag: labelTag._id,
      tokens: payload.tokens,
    });
  },
  addArc(context, payload) {
    const labelX = (payload.endXY.x + payload.startXY.x) / 2;
    const labelY = (payload.endXY.y + payload.startXY.y) / 2;
    const label = addLabel(
      labelX - 10,
      labelY - 10,
      payload.multiplicityLabel,
      0,
      0,
      30,
      payload.labelVisibility
    );
    payload.layer.add(label);
    addHoverEffect(label.children[1]);
    context.commit("pushArc", {
      id: payload.id,
      start: payload.start,
      end: payload.end,
      labelId: label._id,
      multiplicity: payload.multiplicity,
    });
  },
};

const addHoverEffect = (object) => {
  object.on("mouseover touchstart", function () {
    if (object instanceof Konva.Text) {
      this.strokeWidth(1);
    }
    this.stroke("#00a2ec");
  });
  object.on("mouseout touchend", function () {
    if (object instanceof Konva.Text) {
      this.strokeWidth(0);
    } else {
      this.stroke("black");
    }
  });
};

const addLabel = (
  x,
  y,
  innerText,
  offsetX,
  offsetY,
  width = 40,
  visibility = false
) => {
  const label = new Konva.Label({
    x: x + offsetX,
    y: y + offsetY,
    opacity: 1,
    visible: visibility,
  });
  label.add(
    new Konva.Tag({
      fill: "white",
    })
  );
  label.add(
    new Konva.Text({
      text: innerText,
      fontFamily: "Calibri",
      fontSize: 18,
      padding: 0,
      width: width,
      fill: "black",
      align: "center",
      wrap: "word",
      strokeWidth: 0.5,
    })
  );
  return label;
};
