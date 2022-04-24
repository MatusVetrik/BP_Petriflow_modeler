export const getConnectorPoints = (from, to) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  let angle = Math.atan2(-dy, dx);

  const radius = 23;

  return [
    from.x + -radius * Math.cos(angle + Math.PI),
    from.y + radius * Math.sin(angle + Math.PI),
    to.x + -radius * Math.cos(angle),
    to.y + radius * Math.sin(angle),
  ];
};

export const whatOperationWasClicked = (storedClickedElement, type) => {
  if (storedClickedElement === type) return 1;
  return 0;
};

export const reactToActivatedOperation = (storedStage, operation) =>
  storedStage.on("mousedown", (event) => {
    operation(event);
  });
