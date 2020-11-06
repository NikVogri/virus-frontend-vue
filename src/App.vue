<template>
  <main class="container mt-3 mt-md-5">
    <Header @viewChanged="changeComponent" />
    <SignUp v-if="showEmailNotification" @hideEmailNotification="hideEmailNotification"/>
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
import Favorites from './components/Favorites.vue';
import SignUp from './components/SignUp.vue';

export default {
  data() {
    return {
      currComponent: "World",
      showEmailNotification: false
    };
  },
  methods: {
    changeComponent(component) {
      this.currComponent = component;
    },
    hideEmailNotification() {
      this.showEmailNotification = false;
    }
  },
  components: {
    Header,
    Top,
    World,
    Continent,
    Country,
    Footer,
    Compare,
    Favorites,
    SignUp
  },
  mounted() {
    const showEmailCard = localStorage.getItem('showEmailCard');
    if (showEmailCard == null) {
      this.showEmailNotification = true;
    } 
  }
};
</script>

<style lang="scss">
.card {
  min-height: 200px;
}
</style>
