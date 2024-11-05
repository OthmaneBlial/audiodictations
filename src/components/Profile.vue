<template>
  <div class="profile-section">
    <h3>Profile</h3>
    <div class="profile-info">
      <strong>Name:</strong> {{ dictationStore.user.name }}
    </div>
    <div class="profile-info">
      <strong>Email:</strong> {{ dictationStore.user.email }}
    </div>
    <button class="logout-button" @click="logoutUser">
      <i class="fas fa-sign-out-alt"></i> Logout
    </button>
  </div>
</template>

<script>
import { useDictationStore } from '../stores/dictation';
import { useRouter } from 'vue-router';

export default {
  name: 'Profile',
  setup() {
    const dictationStore = useDictationStore();
    const router = useRouter();

    const logoutUser = () => {
      dictationStore.logout();
      router.push({ name: 'Login' });
    };

    return {
      dictationStore,
      logoutUser,
    };
  },
};
</script>

<style scoped>
.profile-section {
  background-color: var(--light-color);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color var(--transition-speed);
  max-width: 600px;
  margin: 0 auto;
}

.dark-mode .profile-section {
  background-color: #2c2c2c;
}

h3 {
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 25px;
}

.profile-info {
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.logout-button {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: var(--danger-color);
  color: var(--light-color);
  transition: background-color var(--transition-speed);
}

.logout-button:hover {
  background-color: var(--danger-color);
  opacity: 0.9;
}
</style>
