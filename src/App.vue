<template>
  <main class="container mt-5">
    <Header @viewChanged="changeComponent" />
    <keep-alive>
      <component :is="currComponent"></component>
    </keep-alive>
    <Footer />
  </main>
</template>

<script>
import Header from "./components/Header.vue";
import World from "./components/World.vue";
import Top from "./components/Top.vue";
import Continent from "./components/Continent.vue";
import Country from "./components/Country.vue";
import Compare from "./components/Compare.vue";
import Footer from "./components/Footer.vue";

export default {
  data() {
    return {
      currComponent: "World",
    };
  },
  methods: {
    changeComponent(component) {
      this.currComponent = component;
    },
  },
  components: {
    Header,
    Top,
    World,
    Continent,
    Country,
    Footer,
    Compare,
  },
};
</script>

<style lang="scss">
.card {
  min-height: 200px;
}
</style>
