<template>
  <Layout :title="'Country Data'" :loading="loading">
    <hr />

    <CountryAutocomplete @inputChanged="changeInputValue" />
   <div class="d-flex justify-content-between w-100 mt-3">

      <button class="btn btn-info active block d-block" @click="fetchCountryData">
      Search
    </button>

     <button class="btn btn-danger active  d-block" v-if="tableData &&  !isFavorited" @click="addToFavorites">
      Add To Favorite
    </button>
    
   </div>
    <p v-if="errorMessage" class="mt-2">
      <strong>{{ errorMessage }}</strong>
    </p>
    <DynamicChart :data="chartData" v-if="!errorMessage && tableData" />
    <div class="table-responsive">
      <table class="table table-borderless" v-if="tableData">
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
  </Layout>
</template>

<script>
import CountryAutocomplete from "./CountryAutocomplete.vue";
import DynamicChart from "./DynamicChart.vue";
import Layout from "./Layout.vue";

export default {
  components: {
    CountryAutocomplete,
    DynamicChart,
    Layout,
  },
  data() {
    return {
      loading: false,
      chartData: null,
      tableData: null,
      errorMessage: "",
      inputVal: "",
      isFavorited: false
    };
  },
  methods: {
    parseDate(date) {
      return date.substring(0, 10).split("-").reverse().join("/");
    },
    changeInputValue(val) {
      this.inputVal = val;
    },
    fetchCountryData() {
      this.loading = true;
      this.$http
        .get(`/country/${this.inputVal}`)
        .then((res) => {
          this.loading = false;
          if (!res.data.data.length) {
            return (this.errorMessage = `No data could be found for: ${this.inputVal}`);
          }
          this.chartData = res.data.data;
          this.tableData = [...res.data.data].reverse();
          this.errorMessage = "";

          if (JSON.parse(localStorage.getItem('favorites').indexOf(this.inputVal) !== -1)) {
            this.isFavorited = true;
          }

        })
        .catch(() => {
          this.loading = false;
          this.errorMessage = "Failed fetching data, please try again later.";
        });
    },
    addToFavorites() {
      const oldFavorites = JSON.parse(localStorage.getItem('favorites'));

      if (oldFavorites) {
        if (oldFavorites.indexOf(this.inputVal) === -1) {
          localStorage.setItem('favorites', JSON.stringify([...oldFavorites, this.inputVal]));
        }
      }  else {
        localStorage.setItem('favorites', JSON.stringify([this.inputVal]));
      }

      this.isFavorited = true;
    }
  },
};
</script>

<style scoped lang="scss">
.Layout {
  overflow: hidden;
}
</style>
