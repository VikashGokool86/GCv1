import { createApp } from 'vue/dist/vue.esm-bundler';
import { createRouter, createWebHistory } from 'vue-router';
import Index from './components/Index.vue';
import Home from './components/Home.vue';
import Greyville from './components/Greyville.vue';
import LyonParilly from './components/LyonParilly.vue';
import Redcliffe from './components/Redcliffe.vue';
import Search from './components/Search.vue';


const routes = [
    { path: '/:pathMatch(.*)*', component: Home },
    { path: '/grey', component: Greyville },
    { path: '/lyon', component: LyonParilly },
    { path: '/search', component: Search },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(Index);
app.use(router);
app.mount('#app');

