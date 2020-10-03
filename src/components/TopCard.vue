<template>
  <div class="card">
    <div class="card-body p-4 d-flex flex-column justify-content-center">
      <p class="card-info">{{ index }} - {{ country }}</p>
      <p class="card-count text-info">
        {{ convertToReadableFormat(infectedCount) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["country", "index", "infectedCount"],
};
</script>

<style scoped lang="scss">
p {
  text-align: center;
  margin: 0;
}
.card-info {
  font-size: 1.5rem;
  font-weight: bold;
}
.card-count {
  font-size: 2.5rem;
  font-weight: bold;
}
</style>
