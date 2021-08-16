const filter_comp = {
  data () {
    return {
      userSearch: '',
    };
  },
  template: `<form action="#" class="search-form" @submit.prevent="$root.$refs.products.filter(userSearch)">
                <input v-model="userSearch" type="text" class="search-field">
                <button class="btn-search" type="submit">
                    Поиск
                </button>
            </form>`,
};

module.exports = filter_comp;