<template>
  <div id="sidebar" class="sidebar">
    <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav()">&times;</a>
    <div class="sidebar-header">
      <h2>Marco Kretz</h2>
      <img class="circular" src="../assets/img/self.jpg" alt="Marco Kretz">
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
  name: "sidebar",

  methods: {
    closeNav() {
      document.getElementsByClassName("closebtn")[0].style.display = "none";
      this.$el.style.width = "0";
    }
  },

  computed: {
    isMobile() {
      return (window.outerWidth || document.body.clientWidth) < 800;
    }
  },

  watch: {
    $route() {
      if (this.isMobile) {
        this.closeNav();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$sidebarColor: #333;
$pale-sky: #6b717f;
$darkColor: #233940;
$darkAccent: #46737f;
$fontColor: #8ce5ff;

.sidebar {
  order: 0;
  flex: 0 1 220px;
  display: flex;
  flex-direction: column;
  color: $fontColor;
  background-color: $darkColor;
  position: fixed;
  top: 3px;
  left: 0;
  z-index: 1;
  transition: 0.3s;
  height: 100vh;
  overflow: hidden;
  width: 210px;
  white-space: nowrap;
  border-top-right-radius: 3px;

  .sidebar-header {
    text-align: center;
  }

  .sidebar-nav {
    flex: 1;

    ul {
      list-style: none;
      padding: 0;
      text-align: center;

      li {
        padding: 10px;
        padding: 3px 7px;

        a {
          padding: 5px;
          background-color: darken($darkAccent, 15);
          color: #fff;
          text-decoration: none;
          display: block;

          &.router-link-exact-active,
          &:hover {
            border-left: 2px solid white;
            margin-left: -2px;
          }
        }
      }
    }
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

.top-left {
  flex-shrink: 0;
  text-align: center;
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
