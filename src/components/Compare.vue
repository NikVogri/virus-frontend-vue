<template>
  <Layout :title="'Compare two countries'" :loading="loading">
    <hr />

    <div class="d-flex">
      <CountryAutocomplete @inputChanged="changeFirstInputVal" class="mr-1" />
      <CountryAutocomplete @inputChanged="changeSecondInputVal" />
    </div>
    <button class="btn btn-info active mt-3" @click="compareData">
      Compare
    </button>
    <div class="table-responsive" v-if="showTable">
      <table class="table">
        <thead>
          <th>Today</th>
          <th>{{ firstCountryName }}</th>
          <th>{{ secondCountryName }}</th>
        </thead>
        <tbody>
          <tr>
            <td><strong>New Infections</strong></td>
            <td :class="{larger: firstCountryTableData.newCases > secondCountryTableData.newCases}">
              {{ convertToReadableFormat(firstCountryTableData.newCases) }}
            </td>
            <td :class="{larger: firstCountryTableData.newCases < secondCountryTableData.newCases}">
              {{ convertToReadableFormat(secondCountryTableData.newCases) }}
            </td>
          </tr>
          <tr>
            <td><strong>Total Infections</strong></td>
            <td :class="{larger: firstCountryTableData.totalCases > secondCountryTableData.totalCases}">
              {{ convertToReadableFormat(firstCountryTableData.totalCases) }}
            </td>
            <td :class="{larger: firstCountryTableData.totalCases < secondCountryTableData.totalCases}">
              {{ convertToReadableFormat(secondCountryTableData.totalCases) }}
            </td>
          </tr>
          <tr>
            <td><strong>Active Cases</strong></td>
            <td :class="{larger: firstCountryTableData.activeCases > secondCountryTableData.activeCases}">
              {{ convertToReadableFormat(firstCountryTableData.activeCases) }}
            </td>
            <td :class="{larger: firstCountryTableData.activeCases < secondCountryTableData.activeCases}">
              {{ convertToReadableFormat(secondCountryTableData.activeCases) }}
            </td>
          </tr>
          <tr>
            <td><strong>Total Deaths</strong></td>
            <td :class="{larger: firstCountryTableData.totalDeaths > secondCountryTableData.totalDeaths}">
              {{ convertToReadableFormat(firstCountryTableData.totalDeaths) }}
            </td>
            <td :class="{larger: firstCountryTableData.totalDeaths < secondCountryTableData.totalDeaths}">
              {{ convertToReadableFormat(secondCountryTableData.totalDeaths) }}
            </td>
          </tr>
          <tr>
            <td><strong>New Deaths</strong></td>
            <td :class="{larger: firstCountryTableData.newDeaths > secondCountryTableData.newDeaths}">
              {{ convertToReadableFormat(firstCountryTableData.newDeaths) }}
            </td>
            <td :class="{larger: firstCountryTableData.newDeaths < secondCountryTableData.newDeaths}">
              {{ convertToReadableFormat(secondCountryTableData.newDeaths) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="errorMessage" class="mt-2">
      <strong>{{ errorMessage }}</strong>
    </p>
  </Layout>
</template>

<script>
import CountryAutocomplete from "./CountryAutocomplete.vue";
import Layout from "./Layout.vue";

export default {
  components: {
    CountryAutocomplete,
    Layout,
  },
  data() {
    return {
      loading: false,
      firstCountryTableData: null,
      secondCountryTableData: null,
      errorMessage: "",
      firstInputVal: "",
      secondInputVal: "",
      showTable: false,
    };
  },
  methods: {
    parseDate(date) {
      return date.substring(0, 10).split("-").reverse().join("/");
    },
    changeFirstInputVal(val) {
      this.firstInputVal = val;
    },
    changeSecondInputVal(val) {
      this.secondInputVal = val;
    },
    async compareData() {
      if (!this.firstInputVal.length && !this.secondInputVal.length) {
        return (this.errorMessage =
          "Please enter name for both countries you want to compare.");
      }

      this.errorMessage = "";
      this.loading = true;
      const firstCountryData = await this.$http.get(
        `/country/${this.firstInputVal}`
      );
      const secondCountryData = await this.$http.get(
        `/country/${this.secondInputVal}`
      );

      this.loading = false;
      if (!firstCountryData.data.data.length) {
        return (this.errorMessage =
          "No results found for: " + this.firstInputVal);
      }

      if (!secondCountryData.data.data.length) {
        return (this.errorMessage =
          "No results found for: " + this.secondInputVal);
      }

      this.firstCountryTableData =
        firstCountryData.data.data[firstCountryData.data.data.length - 1];
      this.secondCountryTableData =
        secondCountryData.data.data[secondCountryData.data.data.length - 1];

      this.firstCountryName = this.firstInputVal;
      this.secondCountryName = this.secondInputVal;

      this.showTable = true;
    },
  },
};
</script>

<style scoped lang="scss">
.Layout {
  overflow: hidden;
}

.larger {
  font-weight: bold;
  color: green;
}
.larger::before {
  content: "+";
}
</style>
