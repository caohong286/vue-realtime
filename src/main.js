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
import ConnectionStatus from './components/ConnectionStatus.vue';
Vue.component('connection-status', ConnectionStatus);

import Navbar from './components/Navbar.vue';
Vue.component('navigation-bar', Navbar);

export const Socket = SocketIo(`http://localhost:3000`);

Vue.use(VueSocketIo, Socket);

new Vue({
	el: '#app',
	render: h => h(App),
});