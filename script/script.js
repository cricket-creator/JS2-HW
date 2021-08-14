const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  components: { products_comp, filter_comp, cart_comp, error_comp },
  methods: {
    getJson (url) {
      return fetch(url)
        .then(result => result.json())
        .catch(err => console.log(err));
    }
  },
});