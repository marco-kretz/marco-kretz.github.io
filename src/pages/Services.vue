<template>
  <div>
    <h1>Leistungen</h1>
    <section>
      <skill
        v-for="skill in skills"
        :key="skill.title"
        :icon="skill.icon"
        :title="skill.title"
        :text="skill.text"
      ></skill>
    </section>
  </div>
</template>

<script>
import Skill from "../components/Skill.vue";
export default {
  name: "services",
  components: { Skill },
  data() {
    return {
      skills: [
        {
          icon: "build",
          title: "WordPress",
          text: "CMS-Lösungen auf Basis von WordPress"
        },
        {
          icon: "extension",
          title: "Themes & Plugins",
          text: "Moderne Themes & Plugins für WordPress"
        },
        {
          icon: "build",
          title: "Symfony 4",
          text: "Hochwertige Maßanfertigungen "
        },
        {
          icon: "face",
          title: "Beratung",
          text: "CMS-Lösungen auf Basis von WordPress"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
section {
  display: flex;
  flex-wrap: wrap;
}
</style>
