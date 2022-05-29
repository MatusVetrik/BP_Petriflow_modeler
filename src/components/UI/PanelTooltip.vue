<template>
  <div class="tooltip">
    <slot></slot>
    <div class="tooltiptext">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tooltip .tooltiptext {
  visibility: hidden;
  background: white;
  opacity: 0;
  color: #000;
  padding: 5px;
  font-size: 50%;
  white-space: nowrap;
  border-radius: 0.5rem;
  position: absolute;
  z-index: 2;
  top: 140%;
  transition: 0.5s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 0.7;
  transform: scale(1.9);
}
</style>
