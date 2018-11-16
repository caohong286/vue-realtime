<template>
  <div id="app">
  <nav>
    <button @click="go(-1)" class="btn btn-default">Backward</button>
    <!-- <button @click="navigateToRoute('/hello')">/Hello</button>
    <button @click="navigateToRoute('/vue_chat')">实时监控</button>
    <button @click="navigateToRoute('/rpd_container')">农电域页面</button> -->
    <router-link to="/hello" tag="button" active-class="active" class="btn btn-default">Hello</router-link>
    <router-link to="/vue_chat" tag="button" active-class="active" class="btn btn-default">实时监控</router-link>
    <router-link to="/rpd_container" tag="button" active-class="active" class="btn btn-default">农电域控制</router-link>
    <button @click="go(1)" class="btn btn-default">Forward</button>
  </nav>


    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    navigateToRoute(routeName) {
      this.$router.push({ path: routeName });
    },
    go(step){
      this.$router.go(step);
    }
  },
}
</script>

<style>
  .container {
    width: 300px;
    margin: 0 auto;
  }
  .btn{
    font-size:1rem;
  }
</style>