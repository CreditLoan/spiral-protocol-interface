<template>
  <div id="app">
    <div id="nav">
      <Header :settingOpenFunc="slipOpen"></Header>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  },
  methods: {
    
  },
  data () {
    return {
    }
  },
  mounted () {
   
  },
  destroy () {
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f4f6ff;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 10px;
}
</style>
