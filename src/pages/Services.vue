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
          icon: "favorite",
          title: "Symfony 4",
          text: "Hochwertige Maßanfertigungen "
        },
        {
          icon: "build",
          title: "WordPress",
          text: "Moderne CMS-Lösungen"
        },
        {
          icon: "extension",
          title: "Themes & Plugins",
          text: "Professionelle Modulentwicklung"
        },
        {
          icon: "face",
          title: "Beratung",
          text: "Passendes Webhosting"
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
