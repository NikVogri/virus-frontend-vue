<template>
  <Layout :title="'Favorites'">
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
  
    <DynamicChart  :data="chartData" v-if="chartData.length"/>
  
   <div class="table-responsive" v-if="tableData.length">
      <table class="table table-borderless">
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Infected</th>
            <th>Active Cases</th>
            <th>New Cases</th>
            <th>New Deaths</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="countryDay in tableData" :key="countryDay.id">
            <td>{{ parseDate(countryDay.created_at) }}</td>
            <td>{{ convertToReadableFormat(countryDay.totalCases) }}</td>
            <td>{{ convertToReadableFormat(countryDay.activeCases) }}</td>
            <td>+{{ convertToReadableFormat(countryDay.newCases) }}</td>
            <td>+{{ convertToReadableFormat(countryDay.newDeaths) }}</td>
            <td>{{ convertToReadableFormat(countryDay.totalDeaths) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  <button class="btn btn-danger active  d-block" v-if="selectedCountry && !loading" @click="removeFromFavorites">
      Remove
    </button>
  </div>

   <div class="mt-3" v-else>
     <p>No favourites yet, go to add some!</p>
   </div>
   <div class="mt-3" v-if="errorMessage">
     <p>{{errorMessage}}</p>
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
      tableData: [],
      errorMessage: '',
      selectedCountry: '',
      loading: false,
    }
  },
  activated() {
    this.favorites = JSON.parse(localStorage.getItem('favorites'));
  },
  methods: {
    parseDate(date) {
      return date.substring(0, 10).split("-").reverse().join("/");
    },
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
          this.tableData = [...res.data.data].reverse().slice(0, 7);
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
      this.tableData = [];
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
