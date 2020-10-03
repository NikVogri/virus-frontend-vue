<template>
  <Layout :loading="loading" :title="'World'">
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <div v-if="!errorMessage && !loading">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>World</th>
            <th>Total Infected</th>
            <th>Active Cases</th>
            <th>New Cases</th>
            <th>New Deaths</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Today</td>
            <td>{{ convertToReadableFormat(todayData.totalCases) }}</td>
            <td>{{ convertToReadableFormat(todayData.activeCases) }}</td>
            <td>+ {{ convertToReadableFormat(todayData.newCases) }}</td>
            <td>+ {{ convertToReadableFormat(todayData.newDeaths) }}</td>
            <td>{{ convertToReadableFormat(todayData.totalDeaths) }}</td>
          </tr>
        </tbody>
      </table>
      <DynamicChart :data="chartData" v-if="!errorMessage" />
    </div>
  </Layout>
</template>

<script>
import Layout from "./Layout.vue";
import DynamicChart from "./DynamicChart.vue";

export default {
  components: {
    Layout,
    DynamicChart,
  },
  data() {
    return {
      loading: true,
      todayData: null,
      chartData: null,
      errorMessage: "",
    };
  },
  mounted() {
    this.$http
      .get("/world")
      .then((res) => {
        this.todayData = res.data.data[res.data.data.length - 1];
        this.chartData = res.data.data;
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
