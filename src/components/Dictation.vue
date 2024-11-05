<template>
  <div class="dictation-section">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <span>Progress:</span>
        Piece <span>{{ dictationStore.currentIndex + 1 }}</span> of
        <span>{{ totalPieces }}</span>
        <div class="progress-container">
          <div
            class="progress-bar"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
      </div>
      <div>
        <button
          class="btn btn-primary"
          @click="playText"
          :disabled="isListening"
        >
          <i class="fas fa-volume-up"></i> Listen
        </button>
        <span v-if="isListening" class="listening-indicator">
          <i class="fas fa-spinner fa-spin"></i> Listening...
        </span>
      </div>
    </div>
    <textarea
      class="form-control"
      v-model="userInput"
      rows="4"
      placeholder="Type your dictation here..."
      aria-label="Your dictation"
    ></textarea>
    <div class="controls d-flex justify-content-between mt-4">
      <button
        class="btn btn-secondary"
        @click="previous"
        :disabled="dictationStore.currentIndex === 0"
      >
        <i class="fas fa-arrow-left"></i> Previous
      </button>
      <button
        class="btn btn-primary"
        @click="next"
        :disabled="dictationStore.currentIndex >= totalPieces"
      >
        Next <i class="fas fa-arrow-right"></i>
      </button>
    </div>
    <div v-if="alert" :class="['alert', `alert-${alert.type}`]">
      {{ alert.message }}
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDictationStore } from "../stores/dictation";
import { useVoiceRSS } from "../composables/useVoiceRSS";

export default {
  name: "Dictation",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const dictationStore = useDictationStore();
    const { speakText, isListening, error } = useVoiceRSS();

    const userInput = ref("");
    const alert = ref(null);

    const totalPieces = computed(() => dictationStore.currentPieces.length);

    const progressPercentage = computed(() => {
      return ((dictationStore.currentIndex + 1) / totalPieces.value) * 100;
    });

    const currentText = computed(
      () => dictationStore.currentPieces[dictationStore.currentIndex]
    );

    const playText = async () => {
      try {
        await speakText(currentText.value);
      } catch (err) {
        showAlert("Error", "Failed to play audio.", "danger");
      }
    };

    const next = () => {
      saveDictation();
      if (dictationStore.currentIndex < totalPieces.value - 1) {
        dictationStore.currentIndex++;
        loadSavedDictation();
      } else {
        finishDictation();
      }
    };

    const previous = () => {
      saveDictation();
      if (dictationStore.currentIndex > 0) {
        dictationStore.currentIndex--;
        loadSavedDictation();
      }
    };

    const saveDictation = () => {
      dictationStore.addDictation(dictationStore.currentIndex, userInput.value);
    };

    const loadSavedDictation = () => {
      userInput.value =
        dictationStore.userDictations[dictationStore.currentIndex] || "";
    };

    const finishDictation = () => {
      router.push({
        name: "Result",
        params: { difficulty: dictationStore.currentDifficulty },
      });
    };

    const showAlert = (title, message, type) => {
      alert.value = { title, message, type };
      setTimeout(() => {
        alert.value = null;
      }, 3000);
    };

    onMounted(() => {
      // Load saved dictation if available
      loadSavedDictation();
    });

    return {
      dictationStore,
      userInput,
      totalPieces,
      progressPercentage,
      playText,
      next,
      previous,
      isListening,
      alert,
    };
  },
};
</script>

<style scoped>
.dictation-section {
  background-color: var(--light-color);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: background-color var(--transition-speed);
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 300px); /* Adjust based on header and footer height */
}

.dark-mode .dictation-section {
  background-color: #2c2c2c;
}

.progress-container {
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  height: 20px;
  margin-top: 10px;
}

.progress-bar {
  height: 100%;
  background-color: var(--primary-color);
  width: 0%;
  transition: width var(--transition-speed);
}

.listening-indicator {
  margin-left: 10px;
  color: var(--danger-color);
  font-size: 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.form-control {
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid var(--input-border);
  background-color: var(--input-bg);
  color: var(--text-color);
  transition: background-color var(--transition-speed),
    color var(--transition-speed);
  margin-top: 20px;
  resize: vertical;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 5px rgba(13, 110, 253, 0.5);
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
  margin: 5px;
}

.btn-primary {
  background-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: var(--primary-color);
  opacity: 0.9;
}

.btn-secondary {
  background-color: var(--secondary-color);
}

.btn-secondary:hover {
  background-color: var(--secondary-color);
  opacity: 0.9;
}

.btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.alert {
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

.mt-4 {
  margin-top: 1.5rem !important;
}
</style>
