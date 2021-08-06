Vue.component('products-list', {
  props: ['filtered', 'image', 'cart'],
  template: `<div class="products container">
                <div v-if="!filtered.length">Product list is empty</div>
                <product v-for="product of filtered" :product="product" :image="image" :products="filtered" :cart="cart"></product>
             </div>`,
});

Vue.component('product', {
  props: ['products', 'product', 'image', 'cart'],
  template: `<div class="product products__product">
                <img :src="image" alt="someimage" class="product__image">
                <h2 class="product__title">{{ product.product_name }}</h2>
                <p class="product__price"> {{ product.price }}</p>
                <button class="product__btn" @click="addProduct(product)">Купить</button>
            </div>`,
  methods: {
    addProduct (product) {
      const find = this.cart.find(item => item.id_product === product.id_product);
      if (find) {
        find.quantity++;
      } else {
        const product = Object.assign({ quantity: 1 }, this.product);
        this.cart.push(product);
      }
    }
  }
});