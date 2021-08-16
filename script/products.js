const product = {
  props: ['product'/*, 'img'*/],
  template: `<div class="product products__product">
                <img :src="product.product_image" alt="someimage" class="product__image">
                <h2 class="product__title">{{ product.product_name }}</h2>
                <p class="product__price">{{ product.price }} $</p>
                <button class="product__btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
            </div>`,
};

const products_comp = {
  components: { product },
  data () {
    return {
      // catalogUrl: '/catalogData.json',
      products: [],
      // productImg: 'https://via.placeholder.com/200x150',
      filtered: [],
    };
  },
  methods: {
    filter (productName) {
      const pattern = new RegExp(productName, 'i');
      if (productName) {
        this.filtered = this.filtered.filter(product => pattern.test(product.product_name));
      } else {
        this.filtered = Array.from(this.products);
      }
    }
  },
  mounted () {
    this.$root.getJson('/api/products')
      .then(data => {
        for (const el of data) {
          this.products.push(el);
          this.filtered.push(el);
        }
      })
      .catch(error => {
        this.$root.$refs.error.status = true;
        this.$root.$refs.error.message = error;
      });
  },
  template: `<div class="products container">
                <div v-if="!filtered.length && !$root.$refs.error.status">Product list is empty</div>
                <product 
                    v-for="product of filtered"
                    :product="product"
                    :key="product.id_product"></product>
             </div>`,
};

module.exports = products_comp;