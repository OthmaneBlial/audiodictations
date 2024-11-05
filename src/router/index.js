import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import DifficultySelection from '../components/DifficultySelection.vue';
import Dictation from '../components/Dictation.vue';
import Result from '../components/Result.vue';
import Progress from '../components/Progress.vue';
import Profile from '../components/Profile.vue';
import { useDictationStore } from '../stores/dictation';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DifficultySelection,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dictation/:difficulty',
    name: 'Dictation',
    component: Dictation,
    meta: { requiresAuth: true },
  },
  {
    path: '/result/:difficulty',
    name: 'Result',
    component: Result,
    meta: { requiresAuth: true },
  },
  {
    path: '/progress',
    name: 'Progress',
    component: Progress,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard to Protect Routes
router.beforeEach((to, from, next) => {
  const dictationStore = useDictationStore();
  const isLoggedIn = dictationStore.isLoggedIn;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
