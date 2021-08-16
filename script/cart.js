const cart_product = {
  props: ['item'/*, 'img'*/],
  template: `<div class="item cart__item">
                <img :src="item.product_image" alt="someimage" class="item__image">
                <div class="item__inner">
                    <h2 class="item__title">{{ item.product_name }}</h2>
                    <p class="item__quantity">{{ item.quantity }} шт.</p>
                    <p class="item__price">{{ item.price * item.quantity}} $</p>
                    <button class="item__btn" @click="$parent.deleteProduct(item)">Удалить</button>   
                </div>
             </div>`,
};

const cart_comp = {
  components: { cart_product },
  data () {
    return {
      cartUrl: '/getBasket.json',
      cart: [],
      // itemImg: 'https://via.placeholder.com/200x150',
      show: false
    };
  },
  template: `<div class="cart">
                <button class="cart__btn" type="button" @click="show = !show">Корзина</button>
                <div class="cart-block invisible" v-show="show">
                    <div v-if="!cart.length">Cart is empty</div>
                    <cart_product v-for="item of cart" :item="item"></cart_product>
                </div>
            </div>`,
  methods: {
    addProduct (product) {
      const find = this.cart.find(item => item.id_product === product.id_product);
      if (find) {
        this.$root.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
          .then(data => {
            if (data.result === 1) {
              find.quantity++;
            }
          });
      } else {
        const newProd = Object.assign({ quantity: 1 }, product);
        this.$root.postJson('/api/cart', newProd)
          .then(data => {
            if (data.result === 1) {
              this.cart.push(newProd);
            }
          });
      }
    },
    deleteProduct (product) {
      const find = this.cart.find(item => item.id_product === product.id_product);
      if (find.quantity > 1) {
        this.$root.putJson(`/api/cart/${find.id_product}`, { quantity: -1 })
          .then(data => {
            if (data.result === 1) {
              find.quantity--;
            }
          });
      } else {
        this.$root.deleteJson(`/api/cart/${find.id_product}`)
          .then(data => {
            if (data.result === 1) {
              this.cart.splice(this.cart.indexOf(product), 1);
            }
          });
      }
      /*
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
        */
    }
  },
  mounted () {
    this.$root.getJson('/api/cart')
      .then(data => {
        for (const content of data.contents) {
          this.cart.push(content);
        }
      });
  }
};

module.exports = cart_comp;