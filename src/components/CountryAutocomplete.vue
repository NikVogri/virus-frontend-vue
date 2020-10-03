<template>
  <div class="w-100 dropdown">
    <input
      type="text"
      placeholder="Enter Country"
      class="form-control"
      v-model="inputValue"
    />

    <ul v-if="inputValue.length > 1 && showList">
      <li
        v-for="country in displayCountryList"
        :key="country.code"
        @click="updateInput(country.name)"
      >
        {{ country.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import countryList from "../lib/countries.js";
export default {
  data() {
    return {
      inputValue: "",
      displayCountryList: null,
      showList: false,
      autocompleted: false,
    };
  },
  methods: {
    updateInput(country) {
      this.inputValue = country;
      this.autocompleted = true;
      this.showList = false;
    },
  },
  watch: {
    inputValue() {
      if (this.inputValue.length > 2 && !this.autocompleted) {
        this.showList = true;
        const list = countryList.filter((country) =>
          country.name.toLowerCase().includes(this.inputValue.toLowerCase())
        );
        if (!list.length) {
          this.showList = false;
        }
        this.displayCountryList = list;
      } else {
        this.showList = false;
      }

      this.$emit("inputChanged", this.inputValue);
      this.autocompleted = false;
    },
  },
};
</script>

<style scoped lang="scss">
input {
  position: relative;
}
ul {
  z-index: 99;
  position: absolute;
  background: #fff;
  top: 100%;
  left: 0;
  width: 100%;
  border: solid 1px #cecece;
  border-top: none;
  list-style: none;
  margin: 5px 0;
  padding: 5px;
  max-height: 100px;
  overflow: auto;
  li {
    padding: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    &:hover {
      background: #0286c2;
      color: #fff;
    }
  }
}
</style>