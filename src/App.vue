<template>
  <div
    :class="{ 'dark-mode': dictationStore.isDarkMode }"
    class="app-container"
  >
    <Sidebar v-if="dictationStore.isLoggedIn" />
    <div class="main-content">
      <Header
        @toggleDarkMode="toggleDarkMode"
        :isDarkMode="dictationStore.isDarkMode"
      />
      <div class="content-wrapper">
        <router-view />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useDictationStore } from "./stores/dictation";

export default {
  name: "App",
  components: {
    Sidebar,
    Header,
    Footer,
  },
  setup() {
    const dictationStore = useDictationStore();

    // Initialize store on app load
    onMounted(() => {
      dictationStore.initializeStore();
    });

    const toggleDarkMode = () => {
      dictationStore.toggleDarkMode();
      document.body.classList.toggle("dark-mode", dictationStore.isDarkMode);
    };

    return {
      dictationStore,
      toggleDarkMode,
    };
  },
};
</script>

<style>
.app-container {
  display: flex;
  min-height: 100%;
}

.main-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background-color: var(--bg-color);
  transition: background-color var(--transition-speed);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1;
}
</style>
