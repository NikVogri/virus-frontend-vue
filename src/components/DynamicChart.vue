<template>
  <div>
    <Chart :labels="labels" :data="statistics" :label="label" />
    <hr />
    <span class="mr-3">Display chart by:</span>
    <ChartButton
      :currentType="currentType"
      :type="button.type"
      :name="button.name"
      v-for="button in buttons"
      @chartChanged="changeChartData"
      :key="button.type"
    />
    <span class="ml-3">/ per day</span>
    <hr />
  </div>
</template>

<script>
import Chart from "./Chart.vue";
import ChartButton from "./ChartButton.vue";

export default {
  props: ["data"],
  data() {
    return {
      buttons: [
        { name: "New Cases", type: "newCases" },
        { name: "Active Cases", type: "activeCases" },
        { name: "New Deaths", type: "newDeaths" },
      ],
      statistics: [],
      labels: [],
      currentType: "newCases",
      label: "New cases per day",
    };
  },
  components: {
    Chart,
    ChartButton,
  },
  methods: {
    getChartData() {
      this.statistics = this.data.map((stat) => stat[this.currentType]);
    },
    getChartLabels() {
      this.labels = this.data.map((stat) =>
        stat.created_at.substring(0, 10).split("-").reverse().join("/")
      );
    },
    changeChartData(type) {
      this.currentType = type;
      this.getChartData();

      switch (type) {
        case "activeCases":
          this.label = "New active cases per day";
          break;
        case "newCases":
          this.label = "New cases per day";
          break;

        case "newDeaths":
          this.label = "New deaths per day";
          break;

        default:
          this.label = "New cases per day";
      }
    },
  },
  created() {
    this.getChartData();
    this.getChartLabels();
  },
  watch: {
    data() {
      this.getChartData();
      this.currentType = "newCases";
    },
  },
};
</script>
<style></style>
