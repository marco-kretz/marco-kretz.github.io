<template>
  <div id="app">
    <Sidebar/>
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

  @media (min-width: 500px) {
    flex-direction: row;
  }
}

.content {
  order: 1;
  flex: 0 1 100%;
  min-height: 100vh;
  padding: 20px;
  flex-direction: row;
}
</style>
