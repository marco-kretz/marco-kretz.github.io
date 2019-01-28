<template>
  <div id="sidebar" class="sidebar">
    <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav()">&times;</a>
    <div class="sidebar-header">
      <h2>Marco Kretz</h2>
      <img class="circular" src="../assets/img/me.jpg" alt="Marco Kretz">
    </div>
    <div class="sidebar-nav">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/ueber-mich">Über Mich</router-link>
        </li>
        <li>
          <router-link to="/leistungen">Leistungen</router-link>
        </li>
        <li>
          <router-link to="/impressum">Impressum</router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar-footer">
      <small>Made with ♥ in Ehrenfeld.</small>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeNav: function() {
      document.getElementsByClassName("closebtn")[0].style.display = "none";
      this.$el.style.width = "0";
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  order: 0;
  flex: 0 1 220px;
  display: flex;
  flex-direction: column;
  color: #eee;
  background-color: #333;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  transition: 0.3s;
  height: 100vh;
  overflow: hidden;
  width: 210px;
  white-space: nowrap;

  .closebtn {
    position: absolute;
    top: 0;
    right: 15px;
    font-size: 36px;
    margin-left: 50px;
    display: none;
    color: #fff;
    text-decoration: none;
  }
}

@media screen and (max-width: 450px) {
  .sidebar {
    width: 0;

    .closebtn {
      display: "inline";
    }
  }
}

.sidebar-header {
  text-align: center;
}

.sidebar-nav {
  flex: 1;
}

.sidebar-footer {
  align-self: end;
  text-align: center;
  width: 100%;
  padding: 5px 0;

  small {
    color: #aaa;
  }
}

.top-left {
  flex-shrink: 0;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;

  li {
    padding: 10px;

    a {
      color: #fff;
      text-decoration: none;
      display: block;
    }
  }
}

.logo {
  text-align: left;
  max-width: 140px;
}

img {
  &.circular {
    max-width: 140px;
    border-radius: 50%;
  }

  &.inverted {
    filter: invert(100%);
  }
}
</style>
