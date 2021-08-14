const cart_product = {
  props: ['item', 'img'],
  template: `<div class="item cart__item">
                <img :src="img" alt="someimage" class="item__image">
                <h2 class="item__title">{{ item.product_name }}</h2>
                <p class="item__quantity">{{ item.quantity }}</p>
                <p class="item__price"> {{ item.price * item.quantity}}</p>
                <button class="item__btn" @click="$parent.deleteProduct(item)">Удалить</button>
              </div>`,
};

const cart_comp = {
  components: { cart_product },
  data () {
    return {
      cartUrl: '/getBasket.json',
      cart: [],
      itemImg: 'https://via.placeholder.com/200x150',
      show: false
    };
  },
  template: `<div class="cart">
                <button class="btn-cart" type="button" @click="show = !show">Корзина</button>
                <div class="cart-block invisible" v-show="show">
                    <div v-if="!cart.length">Cart is empty</div>
                    <cart_product v-for="item of cart" :item="item" :img="itemImg"></cart_product>
                </div>
            </div>`,
  methods: {
    addProduct (product) {
      this.$root.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            const find = this.cart.find(item => item.id_product === product.id_product);
            if (find) {
              find.quantity++;
            } else {
              const newProd = Object.assign({ quantity: 1 }, product);
              this.cart.push(newProd);
            }
          }
        });
    },
    deleteProduct (product) {
      this.$root.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            if (product.quantity > 1) {
              product.quantity--;
            } else {
              this.cart.splice(this.cart.indexOf(product), 1);
            }
          }
        });
    }
  }
};