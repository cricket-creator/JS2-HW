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
    userSearch: '',
    error: {
      status: false,
      message: '',
    },
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
        this.filtered = [...this.products];
      })
      .catch(err => {
        this.error.status = true;
        this.error.message = err;
      });
    this.getJson(`${API + this.cartURL}`)
      .then(data => {
        this.cart = [...data.contents];
      });
  }
});