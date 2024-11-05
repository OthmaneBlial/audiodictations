<template>
  <footer>
    <p>&copy; 2024 DictationApp. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
footer {
  background-color: var(--footer-bg);
  color: var(--text-color);
  padding: 20px 0;
  text-align: center;
  transition: background-color var(--transition-speed), color var(--transition-speed);
  position: fixed;
  bottom: 0;
  width: calc(100% - var(--sidebar-width));
  left: var(--sidebar-width);
}
</style>
