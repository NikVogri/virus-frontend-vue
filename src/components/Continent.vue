<template>
  <Layout :loading="loading" :title="'Continent data'">
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <table class="table table-bordered" v-if="!errorMessage && !loading">
      <thead>
        <tr>
          <th>Continent</th>
          <th>Total Infected</th>
          <th>New Cases</th>
          <th>Deaths</th>
          <th>New Deaths</th>
          <th>Active Cases</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="continent in continents" :key="continent.id">
          <td>{{ convertToReadableFormat(continent.continent) }}</td>
          <td>{{ convertToReadableFormat(continent.totalCases) }}</td>
          <td>{{ convertToReadableFormat(continent.newCases) }}</td>
          <td>{{ convertToReadableFormat(continent.totalDeaths) }}</td>
          <td>{{ convertToReadableFormat(continent.newDeaths) }}</td>
          <td>{{ convertToReadableFormat(continent.activeCases) }}</td>
        </tr>
      </tbody>
    </table>
  </Layout>
</template>

<script>
import Layout from "./Layout.vue";
export default {
  data() {
    return {
      continents: [],
      loading: true,
      errorMessage: "",
    };
  },
  components: {
    Layout,
  },
  mounted() {
    this.$http
      .get("/continents")
      .then((res) => {
        this.continents = res.data.data.sort(
          (a, b) => b.totalCases - a.totalCases
        );
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.errorMessage = "Failed fetching data, please try again later.";
      });
  },
};
</script>

<style></style>
