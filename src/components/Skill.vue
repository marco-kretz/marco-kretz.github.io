<template>
  <div class="cell">
    <article class="skill">
      <h1>
        <i class="material-icons">{{ icon }}</i>
      </h1>
      <h2 class="title">{{ title }}</h2>
      <p>{{ text }}</p>
    </article>
  </div>
</template>

<script>
export default {
  name: "skill",
  props: ["icon", "title", "text"]
};
</script>

<style lang="scss">
.skill {
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 2px 10px;
  text-align: center;

  .title {
    color: #2196f3;
  }
}

.cell {
  padding: 8px;
  flex: 0 1 100%;
}

@media screen and (min-width: 800px) {
  .cell {
    flex-basis: 33.3333%;
  }
}
</style>
