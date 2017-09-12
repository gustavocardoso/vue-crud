<template>
  <div id="app">
    <h1>CRUD</h1>

    <nav class="nav">
      <router-link to="/" class="nav-link" exact>Home</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/category" class="nav-link">Category</router-link>
      <router-link to="/hello" class="nav-link" >Hello</router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 2em 0;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  a {
    color: #42b983;
  }

  .nav {
    margin: 1em 0 3em 0;
  }

  .section-title {
    margin-bottom: 1em;
  }

  .nav-link {
    font-weight: 500;
    text-decoration: none;
    color: #FDFDFF;
    background: #C6C5B9;
    padding: .5em .7em;
  }

  .nav-link.router-link-active {
    color: #393D3F;
  }
</style>
