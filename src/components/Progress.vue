<template>
  <div class="progress-section">
    <h3>My Progress</h3>
    <div v-if="progressHTML" v-html="progressHTML" class="mt-4"></div>
    <div v-else>
      <p>No progress recorded yet.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useDictationStore } from '../stores/dictation';

export default {
  name: 'Progress',
  setup() {
    const progressHTML = ref('');
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

    onMounted(() => {
      loadProgress();
    });

    const loadProgress = () => {
      const savedDifficulties = Object.keys(texts);
      let html = '';

      savedDifficulties.forEach((difficulty) => {
        const userDicts = [];
        const total = texts[difficulty].length;
        let correct = 0;

        for (let i = 0; i < total; i++) {
          const userText = dictationStore.userDictations[i];
          const originalText = texts[difficulty][i];
          if (userText) {
            const isCorrect = compareSingleText(originalText, userText);
            userDicts.push({
              index: i + 1,
              isCorrect,
            });
            if (isCorrect) {
              correct++;
            }
          }
        }

        if (userDicts.length > 0) {
          html += `
            <div class="mb-4">
              <h5>${capitalizeFirstLetter(difficulty)} - ${correct}/${total} Correct</h5>
              <ul class="list-group">
                ${userDicts
                  .map(
                    (dict) => `
                  <li class="list-group-item">
                    Piece ${dict.index}
                    ${
                      dict.isCorrect
                        ? '<span class="badge bg-success">Correct</span>'
                        : '<span class="badge bg-danger">Incorrect</span>'
                    }
                  </li>
                `
                  )
                  .join('')}
              </ul>
            </div>
          `;
        }
      });

      progressHTML.value = html;
    };

    const compareSingleText = (original, user) => {
      const originalWords = original.split(' ');
      const userWords = user.split(' ');
      let isCorrect = true;

      originalWords.forEach((word, index) => {
        if (
          !userWords[index] ||
          userWords[index].toLowerCase() !== word.toLowerCase()
        ) {
          isCorrect = false;
        }
      });

      return isCorrect;
    };

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return {
      progressHTML,
    };
  },
};
</script>

<style scoped>
.progress-section {
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

.dark-mode .progress-section {
  background-color: #2c2c2c;
}

h3 {
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 25px;
}

.list-group {
  list-style: none;
  padding: 0;
}

.list-group-item {
  padding: 10px 15px;
  border: 1px solid var(--input-border);
  border-radius: 4px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  padding: 5px 10px;
  border-radius: 12px;
  color: var(--light-color);
}

.bg-success {
  background-color: var(--success-color);
}

.bg-danger {
  background-color: var(--danger-color);
}

.mt-4 {
  margin-top: 1.5rem !important;
}
</style>
