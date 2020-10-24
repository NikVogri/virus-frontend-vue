<template>
  <div class="card">
    <div class="card-body p-4 p-md-5">
      <div class="row mt-md-5">
        <div class="col-md-8">
          <h1>Corona virus statistics tracker</h1>
          <hr />
          <p class="mt-3">
            Look at accurate data for the past months, fetched and validated
            every 12 hours.
          </p>
          <p>Last updated: {{ lastUpdatedTime }}</p>
          <hr />
        </div>
        <div class="col-md-4">
          <img src="/image/medical.svg" alt="Medical" class="img-fluid" />
        </div>
      </div>
      <div class="mt-5 mt-md-0">
        <ViewButtons
          v-for="viewName in viewList"
          :key="viewName"
          :view="view"
          :viewName="viewName"
          @viewChanged="changeView"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ViewButtons from "./ViewButtons";
export default {
  data() {
    return {
      viewList: ["World", "Top", "Continent", "Country", "Compare"],
      view: "World",
      lastUpdated: "Loading...",
    };
  },
  methods: {
    changeView(view) {
      this.view = view;
      this.$emit("viewChanged", view);
    },
  },
  components: {
    ViewButtons,
  },
  mounted() {
    this.$http
      .get("/top-today")
      .then((res) => (this.lastUpdated = res.data.data[0].created_at))
      .catch(() => (this.lastUpdated = "Failed fetching..."));
  },
  computed: {
    lastUpdatedTime() {
      const updatedAtDate = new Date(this.lastUpdated);
      const currentDate = new Date().getDay();

      if (currentDate === updatedAtDate.getDay()) {
        return "Today, " + updatedAtDate.toLocaleTimeString();
      }

      return new Date(this.lastUpdated).toLocaleString();
    },
  },
};
</script>

<style scoped lang="scss">
p {
  font-size: 17px;
  font-weight: 300;
}
</style>
