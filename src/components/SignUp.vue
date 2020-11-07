<template>
  <div class="card mt-4">
    <button class="closeCard" @click="closeCard" type="button">&times;</button>
    <div class="card-body p-4 p-md-5">
          <h4>Sign up and receive daily updates</h4>
          <p class="mb-5">Receive updates for your selected countries every single day at 2 PM CET</p>
              <form @submit.prevent="confirm" class="m-0">
                <input type="email" placeholder="Your email adress..." class="form-control" v-model="emailInput">
                <div class="d-flex mt-2">
                  <CountryAutoComplete @inputChanged="changeInput" class="mt-3" />
                <button class="btn btn-info mt-3" type="button" @click="addCountryToList">Add To List</button>
                </div>
                <ul class="country-list">
                  <li v-for="country in countryList" :key="country" @click="removeCountryFromList(country)">{{country}}</li>
                </ul>
                <button v-if="showAddButton && emailInput && countryList.length" type="submit" class="btn btn-outline-danger active mt-4">
                  Confirm
                </button>
              </form>

              <p v-if="notification.msg" :class="{'text-danger': notification.type == 'warning', 'text-success': notification.type == 'success'}">{{ notification.msg }}</p>
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
      countryList: [],
      notification: {type: '', msg: ''},
      showAddButton: true
    }
  },
  components: {
    CountryAutoComplete
  },
  watch: {
    emailInput: function() {
      if (!this.showAddButton) {
        this.showAddButton = true;
      }
    }
  },
  methods: {
    changeInput(input) {
      console.log('hgere');
      this.input = input;
    },
    addCountryToList() {

      if (this.countryList.indexOf(this.input) == -1 && this.input) {
        this.countryList.push(this.input);
        this.input = '';
      }
    },
    removeCountryFromList(country) {
      this.countryList = this.countryList.filter(listCountry => listCountry !== country);
    },
    async confirm () {
      const data = {
        countries: this.countryList,
        email: this.emailInput
      };

      try{
        const res = await axios.post('https://virus-email-sender.herokuapp.com/add-email', data)
        this.notification = {type: 'success', msg: res.data.msg};
        this.showAddButton = false;
        setTimeout(this.closeCard, 5000);
      } catch(err) {
        this.showAddButton = false;
        this.notification = {type: 'warning', msg: err.response.data.msg};
      }

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
    margin-bottom: 5px;

    &:not(:last-of-type){
    margin-right: 5px;
    }
  }
}

</style>
