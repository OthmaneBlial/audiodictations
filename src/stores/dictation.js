import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDictationStore = defineStore('dictation', () => {
  const isLoggedIn = ref(false);
  const user = ref({ name: '', email: '' });
  const currentDifficulty = ref(null);
  const currentPieces = ref([]);
  const currentIndex = ref(0);
  const userDictations = ref([]);
  const isDarkMode = ref(false);

  const login = (userData) => {
    isLoggedIn.value = true;
    user.value = userData;
    // Persist login status in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    isLoggedIn.value = false;
    user.value = { name: '', email: '' };
    // Clear persisted data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('currentDifficulty');
    localStorage.removeItem('currentIndex');
    localStorage.removeItem('userDictations');
  };

  const setDifficulty = (difficulty, texts) => {
    currentDifficulty.value = difficulty;
    currentPieces.value = texts[difficulty];
    currentIndex.value = 0;
    userDictations.value = [];
    // Persist difficulty selection
    localStorage.setItem('currentDifficulty', difficulty);
    localStorage.setItem('currentIndex', currentIndex.value);
    localStorage.setItem('userDictations', JSON.stringify(userDictations.value));
  };

  const addDictation = (index, text) => {
    userDictations.value[index] = text;
    // Persist dictation
    localStorage.setItem('userDictations', JSON.stringify(userDictations.value));
  };

  const resetDictation = () => {
    currentDifficulty.value = null;
    currentPieces.value = [];
    currentIndex.value = 0;
    userDictations.value = [];
    // Clear persisted dictation data
    localStorage.removeItem('currentDifficulty');
    localStorage.removeItem('currentIndex');
    localStorage.removeItem('userDictations');
  };

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    // Persist dark mode preference
    localStorage.setItem('isDarkMode', isDarkMode.value ? 'enabled' : 'disabled');
  };

  const initializeStore = () => {
    // Initialize login status from localStorage
    const storedLogin = localStorage.getItem('isLoggedIn');
    if (storedLogin === 'true') {
      isLoggedIn.value = true;
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        user.value = storedUser;
      }
    }

    // Initialize dark mode preference from localStorage
    const storedDarkMode = localStorage.getItem('isDarkMode');
    if (storedDarkMode === 'enabled') {
      isDarkMode.value = true;
    }

    // Initialize dictation progress from localStorage
    const storedDifficulty = localStorage.getItem('currentDifficulty');
    const storedIndex = parseInt(localStorage.getItem('currentIndex'), 10);
    const storedDictations = JSON.parse(localStorage.getItem('userDictations'));

    if (storedDifficulty && !isNaN(storedIndex) && storedDictations) {
      currentDifficulty.value = storedDifficulty;
      currentIndex.value = storedIndex;
      userDictations.value = storedDictations;
      // Note: The component should load the corresponding texts based on difficulty
    }
  };

  return {
    isLoggedIn,
    user,
    currentDifficulty,
    currentPieces,
    currentIndex,
    userDictations,
    isDarkMode,
    login,
    logout,
    setDifficulty,
    addDictation,
    resetDictation,
    toggleDarkMode,
    initializeStore,
  };
});
