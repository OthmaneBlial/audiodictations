<template>
  <aside class="sidebar">
    <router-link to="/" class="nav-link" exact-active-class="active">
      <i class="fas fa-home"></i> Home
    </router-link>
    <router-link v-if="dictationStore.isLoggedIn" to="/progress" class="nav-link" exact-active-class="active">
      <i class="fas fa-chart-line"></i> My Progress
    </router-link>
    <router-link v-if="dictationStore.isLoggedIn" to="/profile" class="nav-link" exact-active-class="active">
      <i class="fas fa-user"></i> Profile
    </router-link>
  </aside>
</template>

<script>
import { computed } from 'vue';
import { useDictationStore } from '../stores/dictation';

export default {
  name: 'Sidebar',
  setup() {
    const dictationStore = useDictationStore();

    const isLoggedIn = computed(() => dictationStore.isLoggedIn);

    return {
      isLoggedIn,
      dictationStore,
    };
  },
};
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--navbar-bg);
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: background-color var(--transition-speed);
}

.nav-link {
  text-decoration: none;
  color: var(--text-color);
  padding: 10px 15px;
  margin: 5px 0;
  border-radius: 8px;
  transition: background-color var(--transition-speed), color var(--transition-speed);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-link.active,
.nav-link:hover {
  background-color: var(--primary-color);
  color: var(--light-color);
}
</style>
