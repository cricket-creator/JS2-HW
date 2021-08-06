Vue.component('cart-comp', {
  props: ['cart'],
  data () {
    return {
      show: false
    };
  },
  template: `<div class="cart">
                <button class="btn-cart" type="button" @click="show = !show">Корзина</button>
                <div class="cart-block invisible" v-show="show">
                    <div v-if="!cart.length">Cart is empty</div>
                    <cart-product v-for="product of cart" :product="product" :cart="cart"></cart-product>
                </div>
            </div>`,
});

Vue.component('cart-product', {
  props: ['product', 'cart'],
  template: `<div class="item cart__item">
                <img :src="$root.catalogImg" alt="someimage" class="item__image">
                <h2 class="item__title">{{ product.product_name }}</h2>
                <p class="item__quantity">{{ product.quantity }}</p>
                <p class="item__price"> {{ product.price * product.quantity}}</p>
                <button class="item__btn" @click="deleteProduct(product)">Удалить</button>
              </div>`,
  methods: {
    deleteProduct (product) {
      const find = this.cart.find(item => item.id_product === product.id_product);
      if (find.quantity > 1) {
        find.quantity--;
      } else {
        this.cart.splice(this.cart.indexOf(product), 1);
      }
    }
  }
});