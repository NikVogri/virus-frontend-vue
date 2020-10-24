<template>
  <Layout :title="'Favorites'" >
   <div class="mt-3" v-if="favorites.length > 0">
  <button v-for="favorite in favorites" 
    :key="favorite.url"
    class="btn btn-info "
    type="button"
    @click="fetchCountryData(favorite)"
  >
    {{favorite}}
  </button>

  <Spinner v-if="loading"/>
  
  <DynamicChart  :data="chartData" v-if="chartData.length && !loading"/>
  
  <button class="btn btn-danger active  d-block" v-if="selectedCountry && !loading" @click="removeFromFavorites">
      Remove
    </button>
   </div>

   <div class="mt-3" v-else>
     <p>No favourites yet, go to add some!</p>
   </div>
  </Layout>
</template>

<script>
import Layout from "./Layout.vue";
import DynamicChart from "./DynamicChart.vue";
import Spinner from './Spinner.vue';

export default {
  components: {
    Layout,
    DynamicChart,
    Spinner

  },
  data() {
    return {
      favorites: [],
      chartData: [],
      errorMessage: '',
      selectedCountry: '',
      loading: false,
    }
  },
  mounted() {
    this.favorites = JSON.parse(localStorage.getItem('favorites'));
  },
  methods: {
    fetchCountryData(country) {
      this.selectedCountry = country;
      this.loading = true;
      this.$http
        .get(`/country/${country}`)
        .then((res) => {
          this.loading = false;
          if (!res.data.data.length) {
            return (this.errorMessage = `No data could be found for: ${country}`);
          }
          this.chartData = res.data.data;
          this.errorMessage = "";

        })
        .catch(() => {
          this.loading = false;
          this.errorMessage = "Failed fetching data, please try again later.";
        });
    },
    removeFromFavorites() {
      const newFavoriteList = this.favorites.filter(country => country !== this.selectedCountry);
      localStorage.setItem('favorites', JSON.stringify(newFavoriteList));
      this.chartData = [];
      this.selectedCountry = '';
      this.favorites = newFavoriteList;
    }
  }

};
</script>

<style scoped lang="scss">
.Layout {
  overflow: hidden;
}

</style>
