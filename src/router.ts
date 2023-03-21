import { createRouter, createWebHistory } from 'vue-router';
import JobList from './components/JobList.vue';
import Admin from './components/Admin.vue';
import AddJobForm from './components/AddJobForm.vue';
import AdminJobList from './components/AdminJobList.vue';
import Login from './components/Login.vue';
import { readCookie } from './common/helpers';

const routes = [
  { path: '/', component: JobList },
  {
    path: '/admin',
    component: Admin,
    children: [
      { path: '', component: AdminJobList },
      { path: 'add-job', component: AddJobForm },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  { path: '/login', component: Login, meta: { authNotRequired: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(function (to, _, next) {
  const isAuthenticated = readCookie('accessToken');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.authNotRequired && isAuthenticated) {
    next('/admin');
  } else {
    next();
  }
});

export default router;
