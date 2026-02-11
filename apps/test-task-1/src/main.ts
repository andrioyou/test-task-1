import './styles.scss';
import { createApp } from 'vue';
import App from './app/App.vue';
import { createPinia } from 'pinia';

const app = createApp(App).use(createPinia());
app.mount('#root');
