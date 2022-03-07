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
  opacity: 0;
  color: #000;
  border-radius: 2rem;
  padding: 5px;
  font-size: 50%;
  white-space: nowrap;

  position: absolute;
  z-index: 2;
  top: 130%;
  transition: 0.5s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 0.6;
  transform: scale(1.9);
}
</style>
