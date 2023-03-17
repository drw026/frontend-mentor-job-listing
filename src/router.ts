import { createRouter, createWebHistory } from 'vue-router';
import JobList from './components/JobList.vue'; 
import Admin from './components/Admin.vue';
import AddJobForm from './components/AddJobForm.vue';
import AdminJobList from './components/AdminJobList.vue';

const routes = [ 
  { path: '/', component: JobList},
  { path: '/admin', component: Admin, children: [{ path: '', component: AdminJobList }, { path: 'add-job', component: AddJobForm }]}
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
