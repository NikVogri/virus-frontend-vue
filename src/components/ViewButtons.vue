<template>
  <button
    class="btn btn-info "
    type="button"
    :class="isActive"
    @click="changeView(viewName)"
  >
    {{ viewName }}
  </button>
</template>

<script>
export default {
  props: ["view", "viewName"],
  methods: {
    changeView(view) {
      this.$emit("viewChanged", view);
    },
  },
  computed: {
    isActive() {
      if (this.view == this.viewName) {
        return "active";
      }
      return null;
    },
  },
};
</script>

<style></style>
