<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <router-link to="app">home</router-link>
    <router-link to="login">login</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to my Vue.js App"
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
  color: red;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
