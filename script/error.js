const error_comp = {
  data () {
    return {
      status: false,
      message: '',
    };
  },
  template: `<div class="error container" v-if="status">
                Ошибка запроса к серверу: {{ message }}
             </div>`
};