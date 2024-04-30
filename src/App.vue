<template>
  <div id="app">
    <HeaderBar />
    <DiagramEditor />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
import DiagramEditor from './components/DiagramEditor.vue'

export default {
  name: 'App',
  components: {
    HeaderBar,
    DiagramEditor,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
body{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
