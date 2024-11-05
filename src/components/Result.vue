<template>
  <div class="result-section">
    <h3>Dictation Results</h3>
    <div class="comparison-container">
      <div class="original">
        <h5>Original Text:</h5>
        <p>{{ originalText }}</p>
      </div>
      <div class="user">
        <h5>Your Dictation:</h5>
        <p>{{ userText }}</p>
      </div>
      <div class="comparison">
        <h5>Comparison:</h5>
        <p v-html="comparisonText"></p>
      </div>
    </div>
    <button class="btn btn-success mt-4" @click="restart">
      <i class="fas fa-redo"></i> Restart
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDictationStore } from "../stores/dictation";

export default {
  name: "Result",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const dictationStore = useDictationStore();

    const originalText = ref("");
    const userText = ref("");
    const comparisonText = ref("");

    const texts = {
      simple: [
        "The cat sleeps on the couch.",
        "The sun shines brightly in the sky.",
        "Maria loves red apples.",
        "The dog runs in the garden.",
        "The bird sings in the trees.",
      ],
      medium: [
        "Children play in the park after school.",
        "The garden is filled with colorful flowers in spring.",
        "Peter prepared a delicious chocolate cake.",
        "The municipal library offers a vast collection of books.",
        "The local market provides fresh produce every morning.",
      ],
      difficult: [
        "Gothic architecture is characterized by its pointed arches and elaborate stained glass windows.",
        "Technological advancements have revolutionized the way we communicate today.",
        "The complexity of marine ecosystems requires a deep understanding of biological interactions.",
        "The evolution of languages reflects cultural and social changes over time.",
        "The metamorphosis of butterflies is a fascinating example of biological transformation.",
      ],
    };

    onMounted(() => {
      const difficulty = route.params.difficulty || "simple";
      const currentPieces = texts[difficulty];
      const userDictations = dictationStore.userDictations;

      originalText.value = currentPieces.join(" ");
      userText.value = userDictations.join(" ");
      comparisonText.value = compareTexts(originalText.value, userText.value);
    });

    const compareTexts = (original, user) => {
      const originalWords = original.split(" ");
      const userWords = user.split(" ");
      let comparison = "";

      const maxLength = Math.max(originalWords.length, userWords.length);

      for (let i = 0; i < maxLength; i++) {
        const originalWord = originalWords[i] || "";
        const userWord = userWords[i] || "";

        if (userWord.toLowerCase() === originalWord.toLowerCase()) {
          comparison += `<span class="match">${originalWord}</span> `;
        } else {
          comparison += `<span class="mismatch">${originalWord}</span> `;
        }
      }

      return comparison.trim();
    };

    const restart = () => {
      // Clear dictations and navigate back to difficulty selection
      dictationStore.resetDictation();
      router.push({ name: "Home" });
    };

    return {
      originalText,
      userText,
      comparisonText,
      restart,
    };
  },
};
</script>

<style scoped>
.result-section {
  background-color: var(--light-color);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: background-color var(--transition-speed);
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px); /* Adjust based on header and footer height */
}

.dark-mode .result-section {
  background-color: #2c2c2c;
}

h3 {
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 25px;
}

.comparison-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  overflow-y: auto;
  flex: 1;
}

.comparison-container .original,
.comparison-container .user,
.comparison-container .comparison {
  padding: 15px;
  border-radius: 8px;
  background-color: var(--light-color);
  transition: background-color var(--transition-speed);
  flex: 1;
}

.dark-mode .comparison-container .original,
.dark-mode .comparison-container .user,
.dark-mode .comparison-container .comparison {
  background-color: #3a3a3a;
}

.comparison-container h5 {
  margin-bottom: 10px;
  color: var(--primary-color);
}

::v-deep .match {
  background-color: #d4edda; /* Light green background */
  padding: 2px 4px;
  border-radius: 4px;
}

::v-deep .mismatch {
  background-color: #f8d7da; /* Light red background */
  padding: 2px 4px;
  border-radius: 4px;
}

.btn-success {
  background-color: var(--success-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color var(--transition-speed), transform 0.2s;
  color: var(--light-color);
  margin-top: 20px;
}

.btn-success:hover {
  background-color: var(--success-color);
  opacity: 0.9;
  transform: scale(1.05);
}

.btn-success i {
  margin: 0;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.comparison span {
  display: inline-block;
  margin-right: 2px;
}
</style>
