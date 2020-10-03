<template>
  <div class="container mt-5">
    <Header @viewChanged="changeComponent" />
    <keep-alive>
      <component :is="currComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import World from "./components/World.vue";
import Top from "./components/Top.vue";
import Continent from "./components/Continent.vue";
import Country from "./components/Country.vue";

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
  },
};
</script>

<style lang="scss">
.card {
  overflow: auto;
}
.card {
  min-height: 200px;
}
</style>
