<template>
  <div id="app">
    <Sidebar/>
    <span class="burger" v-on:click="openNav()">
      <div></div>
      <div></div>
      <div></div>
    </span>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "App",
  components: {
    Sidebar
  },
  methods: {
    openNav: function() {
      document.getElementsByClassName("closebtn")[0].style.display = "inline";
      document.getElementById("sidebar").style.width = "210px";
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lato:400,700");

*,
*:before,
*:after {
  box-sizing: inherit;
}

html,
body {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

#app {
  padding: 0;
  margin: 0;
  font-family: "Lato", sans-serif;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #333;
  min-height: 100vh;

  @media (min-width: 450px) {
    flex-direction: row;
  }
}

.burger {
  padding-top: 5px;
  padding-left: 20px;

  @media (min-width: 451px) {
    display: none;
  }

  @media screen and (max-width: 450px) {
    display: inline;
  }

  div {
    width: 25px;
    height: 4px;
    background-color: black;
    margin: 3px 0;
  }
}

.content {
  order: 1;
  flex: 0 1 100%;
  min-height: 100vh;
  padding: 5px 20px;
  flex-direction: row;
  margin-left: 210px;

  @media screen and (max-width: 450px) {
    margin-left: 0;
  }
}
</style>
