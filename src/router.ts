import { createRouter, createWebHistory } from 'vue-router';
import JobList from './components/JobList.vue'; 
import Admin from './components/Admin.vue';

const routes = [ 
  { path: '/', component: JobList},
  { path: '/admin', component: Admin}
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
