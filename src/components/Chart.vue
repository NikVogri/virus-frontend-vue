<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    data: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },

  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const chartData = {
        datasets: [
          {
            lineTension: 0,
            fill: "start",
            label: this.label,
            data: this.data,
            backgroundColor: "rgba(54, 162, 235, 0.3)",
            borderColor: ["rgba(54, 162, 235, 1)"],
            borderWidth: 2,
          },
        ],
        labels: this.labels,
      };

      this.renderChart(chartData, {
        responsive: true,
        maintainAspectRatio: false,
      });
    },
  },
  watch: {
    data() {
      this.createChart();
    },
  },
};
</script>
