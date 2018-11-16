
import Chat from './components/vue_chat/main.vue';
import RpdContainer from './components/rpd/rpdContainer.vue';



const Hello = { template:`<h1>Hello</h1>`};



export const routes = [
	// { path: "",component:Home , name:'home' },
	{ path: '/hello', component: Hello },
	{ path: '/vue_chat', component: Chat },
	{ path: '/rpd_container', component: RpdContainer }

];
