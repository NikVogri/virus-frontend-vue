<template>
  <button class="btn btn-info" :class="isActive" @click="changeChartData()">
    {{ name }}
  </button>
</template>

<script>
export default {
  props: ["currentType", "type", "name"],

  methods: {
    changeChartData() {
      this.$emit("chartChanged", this.type);
    },
  },
  computed: {
    isActive() {
      return this.type === this.currentType ? "active" : "";
    },
  },
};
</script>

<style></style>
