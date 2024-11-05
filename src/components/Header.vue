<template>
  <div class="header">
    <div class="form-switch">
      <input
        type="checkbox"
        id="darkModeToggle"
        aria-label="Toggle Dark Mode"
        :checked="isDarkMode"
        @change="$emit('toggleDarkMode')"
      />
      <label for="darkModeToggle"><i class="fas fa-moon"></i></label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isDarkMode: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
}

/* Dark Mode Toggle */
.form-switch {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-switch input {
  width: 40px;
  height: 20px;
  -webkit-appearance: none;
  background-color: var(--secondary-color);
  outline: none;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: background-color var(--transition-speed);
}

.form-switch input:checked {
  background-color: var(--primary-color);
}

.form-switch input::before {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  top: 1px;
  left: 1px;
  background-color: var(--light-color);
  transition: transform var(--transition-speed);
}

.form-switch input:checked::before {
  transform: translateX(20px);
}

.form-switch label {
  cursor: pointer;
  color: var(--text-color);
}
</style>
