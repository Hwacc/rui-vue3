import { createApp } from 'vue';
import App from './App.vue';
import { vTitle } from '@/core/directives/title';

import './styles/tailwind.css';
import './styles/index.css';

const app = createApp(App);

app.directive('title', vTitle);

app.mount('#root');
