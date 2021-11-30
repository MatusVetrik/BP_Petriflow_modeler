export default {
  setCanvas(context, payload) {
    context.commit("setCanvas", payload);
  },
  clickOnPanel(context, payload) {
    context.commit("clickOnPanel", payload);
  },
  async drawSVG(context, payload) {
    let url = context.state.clicked.url;
    url = url.replace("../assets", "");
    const img = new Image();
    const enco = await import("../assets" + url);
    img.src = enco.default;
    const rect = payload.canvas.getBoundingClientRect();
    let ctx = payload.canvas.getContext("2d");
    ctx.drawImage(
      img,
      payload.event.clientX - rect.left - 20,
      payload.event.clientY - rect.top - 20,
      40,
      40
    );
  },
  drawTransition(context, payload) {
    context.commit("pushTransition", payload);
  },
  drawPlace(context, payload) {
    context.commit("pushPlace", payload);
  },
  drawArc(context, payload) {
    context.commit("pushArc", payload);
  },
};
