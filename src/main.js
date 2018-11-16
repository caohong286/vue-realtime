// import Vue from 'vue'
// import App from './App.vue'

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })


import Vue from 'vue';
import App from './App.vue';
import SocketIo from 'socket.io-client';
import VueSocketIo from 'vue-socket.io';
import ConnectionStatus from './components/vue_chat/ConnectionStatus.vue';
import ENV from './config/env';
import VueRouter from 'vue-router';
import {routes} from './routes';

Vue.component('connection-status', ConnectionStatus);

import Navbar from './components/vue_chat/Navbar.vue';
Vue.component('navigation-bar', Navbar);

export const Socket = SocketIo(ENV.SERVER_LOCATION);

Vue.use(VueSocketIo, Socket);





const router = new VueRouter({
	routes,
	mode:"history"
});

Vue.use(VueRouter);




new Vue({
	el: '#app',
	router,
	render: h => h(App),
});