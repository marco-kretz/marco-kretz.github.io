<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h2>Marco Kretz</h2>
      <img class="circular" src="../assets/img/me.jpg" alt="Marco Kretz">
    </div>
    <div class="sidebar-footer">
      <small>Made with ♥ in Ehrenfeld.</small>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.sidebar {
  order: 0;
  flex: 0 1 220px;
  display: flex;
  flex-direction: column;
  color: #eee;
  background-color: #333;
}

@media (max-width: 500px) {
  .sidebar {
    flex-direction: row;
  }
}

.sidebar-header {
  text-align: center;
  flex: 1;
}

.sidebar-footer {
  align-self: end;
  text-align: center;
  width: 100%;
}

.sidebar-footer small {
  color: #aaa;
}

.top-left {
  flex-shrink: 0;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

ul > li {
  background-color: #999;
  padding: 10px;
}

.logo {
  text-align: left;
  max-width: 140px;
}

img.circular {
  max-width: 140px;
  border-radius: 50%;
}

img.inverted {
  filter: invert(100%);
}
</style>
