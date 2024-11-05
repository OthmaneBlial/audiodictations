<template>
  <div class="login-section">
    <h3>Welcome to DictationApp</h3>
    <button class="btn btn-primary" @click="login">
      <i class="fab fa-google"></i> Sign in with Google
    </button>
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useDictationStore } from '../stores/dictation';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const dictationStore = useDictationStore();
    const router = useRouter();
    const error = ref(null);

    const login = () => {
      // Simulate login process
      // Replace this with real authentication logic as needed
      const fakeUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
      };

      try {
        dictationStore.login(fakeUser);
        router.push({ name: 'Home' });
      } catch (err) {
        console.error('Login failed:', err);
        error.value = 'Failed to log in. Please try again.';
      }
    };

    return {
      login,
      error,
    };
  },
};
</script>

<style scoped>
.login-section {
  background-color: var(--light-color);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: background-color var(--transition-speed);
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.dark-mode .login-section {
  background-color: #2c2c2c;
}

h3 {
  color: var(--primary-color);
  margin-bottom: 25px;
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

.btn i {
  margin-right: 8px;
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
</style>
