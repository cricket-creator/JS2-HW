const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogURL: '/catalogData.json',
    catalogImg: 'https://via.placeholder.com/200x150',
    products: [],
    cartURL: '/getBasket.json',
    cart: [],
    filtered: [],
  },
  methods: {
    getJson (url) {
      return fetch(url)
        .then(result => result.json())
        .catch(err => console.log(err));
    }
  },
  mounted () {
    this.getJson(`${API + this.catalogURL}`)
      .then(data => {
        this.products = [...data];
        this.filtered = [...data];
      });
    this.getJson(`${API + this.cartURL}`)
      .then(data => {
        this.cart = [...data.contents];
      });
  }
});