<template>
  <div class="loading">
    <div class="animate_loading_icon"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.loading {
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
}
.animate_loading_icon {
  width: 6px;
  height: 6px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  animation: loading 2000ms ease infinite;
}

@keyframes loading {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(3);
  }
}
</style>