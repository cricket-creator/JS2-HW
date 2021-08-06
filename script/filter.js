Vue.component('filter-comp', {
  props: ['filtered', 'products'],
  data () {
    return {
      userSearch: '',
    }
  },
  template: `<form action="#" class="search-form" @submit.prevent="filter">
                <input v-model="userSearch" type="text" class="search-field">
                <button class="btn-search" type="submit">
                    Поиск
                </button>
            </form>`,
  methods: {
    filter () {
      const pattern = new RegExp(this.userSearch, 'i');
      if (!this.userSearch) {
        this.filtered = Array.from(this.products);
      } else {
        this.filtered = this.filtered.filter(product => pattern.test(product.product_name));
        console.log(this.filtered);
      }
    }
  }
});