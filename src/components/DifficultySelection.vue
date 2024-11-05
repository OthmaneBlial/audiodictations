<template>
  <div class="difficulty-selection">
    <h3>Select Difficulty Level:</h3>
    <div class="d-grid">
      <button class="btn btn-success" @click="selectDifficulty('simple')">
        Simple
      </button>
      <button class="btn btn-warning" @click="selectDifficulty('medium')">
        Medium
      </button>
      <button class="btn btn-danger" @click="selectDifficulty('difficult')">
        Difficult
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useDictationStore } from '../stores/dictation';

export default {
  name: 'DifficultySelection',
  setup() {
    const router = useRouter();
    const dictationStore = useDictationStore();

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

    const selectDifficulty = (difficulty) => {
      dictationStore.setDifficulty(difficulty, texts);
      router.push({ name: 'Dictation', params: { difficulty } });
    };

    return {
      selectDifficulty,
    };
  },
};
</script>

<style scoped>
.difficulty-selection {
  background-color: var(--light-color);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: background-color var(--transition-speed);
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  flex: 1;
}

.dark-mode .difficulty-selection {
  background-color: #2c2c2c;
}

h3 {
  color: var(--primary-color);
  margin-bottom: 25px;
}

.d-grid {
  display: grid;
  gap: 20px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color var(--transition-speed), transform 0.2s;
  text-decoration: none;
  color: var(--light-color);
}

.btn-success {
  background-color: var(--success-color);
}

.btn-success:hover {
  background-color: var(--success-color);
  opacity: 0.9;
}

.btn-warning {
  background-color: var(--warning-color);
  color: var(--dark-color);
}

.btn-warning:hover {
  background-color: var(--warning-color);
  opacity: 0.9;
}

.btn-danger {
  background-color: var(--danger-color);
}

.btn-danger:hover {
  background-color: var(--danger-color);
  opacity: 0.9;
}
</style>
