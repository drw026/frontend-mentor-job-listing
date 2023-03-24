import { createApp } from 'vue';
import './styles.css';
import router from './router';
import App from './App.vue';
import Dialog from './components/Dialog.vue';
import Page from './components/Page.vue';

const app = createApp(App);
app.use(router);
app.component('base-dialog', Dialog);
app.component('page', Page);
app.mount('#app');
