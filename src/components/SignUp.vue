<template>
  <div class="card mt-4">
    <button class="closeCard" @click="closeCard" type="button">&times;</button>
    <div class="card-body p-4 p-md-5">
          <h4>Sign up and receive daily updates</h4>
          <p class="mb-5">Receive updates for your selected countries every single day at 2 PM CET</p>
              <form @submit.prevent="confirm">
                <input type="email" placeholder="Your email adress..." class="form-control" v-model="emailInput">
                <div class="d-flex mt-2">
                  <CountryAutoComplete @inputChanged="changeInput" class="mt-3"/>
                <button class="btn btn-info mt-3" type="button" @click="addCountryToList">Add To List</button>
                </div>
                <ul class="country-list">
                  <li v-for="country in countryList" :key="country" @click="removeCountryFromList(country)">{{country}}</li>
                </ul>
                <button v-if="countryList.length && emailInput" type="submit" class="btn btn-outline-danger active mt-4">
                  Confirm
                </button>
              </form>
        </div>
  </div>
</template>

<script>
import CountryAutoComplete from './CountryAutocomplete.vue';
import axios from 'axios';

export default {
  data() {
    return {
      input: '',
      emailInput: '',
      countryList: []
    }
  },
  components: {
    CountryAutoComplete
  },
  methods: {
    changeInput(input) {
      this.input = input;
    },
    addCountryToList() {
      this.countryList.push(this.input);
      this.input = '';
    },
    removeCountryFromList(country) {
      this.countryList = this.countryList.filter(listCountry => listCountry !== country);
    },
    confirm() {
      const data = {
        countries: this.countryList,
        email: this.emailInput
      };

      console.log(data);

      axios.post('https://virus-email-sender.herokuapp.com/add-email', data).then(res => this.message = res.message).catch(err => this.message = err.message);
    }, 
    closeCard() {
      localStorage.setItem('showEmailCard', false);
      this.$emit('hideEmailNotification');
    }
  }
}
</script>

<style scoped lang="scss">
.closeCard {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  background: none;
  border: none;
}
.country-list {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    padding: 2px 10px;
    border-radius: 5px;
    font-weight: medium;
    color: #fff;
    font-size: 16px;
    background: #03a9f4;
    display: inline-block;
    cursor: pointer;

    &:not(:last-of-type){
    margin-right: 5px;
    }
  }
}
</style>
