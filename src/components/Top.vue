<template>
  <Layout :loading="loading" :title="'Most infected countries today'">
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <div class="row" v-if="!errorMessage && !loading">
      <div
        class="col-md-4 mt-md-0 mt-3"
        v-for="(country, index) in topCountries"
        :key="country.name"
      >
        <TopCard
          :country="country.country"
          :infectedCount="country.newCases"
          :index="index + 1"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import TopCard from "./TopCard";
import Layout from "./Layout.vue";

export default {
  data() {
    return {
      topCountries: null,
      loading: true,
      errorMessage: "",
    };
  },
  components: {
    Layout,
    TopCard,
  },
  mounted() {
    this.$http
      .get("/top-today")
      .then((res) => {
        this.topCountries = res.data.data;
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
