const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const products = new Vue({
  el: '#app',
  data: {
    catalogURL: '/catalogData.json',
    products: [],
    filtered: [],
    cart: [],
    imgCatalog: 'https://via.placeholder.com/200x150',
    userSearch: '',
    show: false,
  },
  methods: {
    getJson (url) {
      return fetch(url)
        .then(result => result.json())
        .catch(err => console.log(err));
    },
    addProduct (item) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            const found = this.cart.find(product => product.id_product === item.id_product);
            if (found) {
              found.quantity++;
            } else {
              const product = Object.assign({ quantity: 1 }, item);
              this.cart.push(product);
            }
          }
          console.log(this.cart);
        });
    },
    deleteProduct (item) {
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            if (item.quantity > 1) {
              const found = this.cart.find(product => product.id_product === item.id_product);
              found.quantity--;
            } else {
              this.cart.splice(this.cart.indexOf(item), 1);
            }
          }
          console.log(this.cart);
        });
    },
    filter () {
      const pattern = new RegExp(this.userSearch, 'i');

      if (!this.userSearch) {
        this.filtered = Array.from(this.products);
      } else {
        this.filtered = this.filtered.filter(product => pattern.test(product.product_name));
      }
    },
    closeCart () {
      setTimeout(() => {
        this.show = false;
      }, 5000);
    }
  },
  mounted () {
    this.getJson(`${API + this.catalogURL}`)
      .then(data => {
        for (const dataElem of data) {
          this.products.push(dataElem);
          this.filtered.push(dataElem);
        }
      });
    /*
    this.getJson(`getProducts.json`)
      .then(data => {
        for (const dataElem of data) {
          this.products.push(dataElem);
        }
      });
      */
  }
});