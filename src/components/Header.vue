<template>
  <div class="card">
    <div class="card-body">
      <div class="row mt-5">
        <div class="col-md-8 p-md-5">
          <h1>Corona virus statistics tracker</h1>
          <hr />
          <p class="mt-3">
            Look at data for the past months for every country!
          </p>
          <p>Last updated: Today</p>
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
};
</script>

<style scoped lang="scss">
p {
  font-size: 20px;
  font-weight: 300;
}
</style>
