Vue.component('error-comp', {
  template: `<div class="error container">
                Ошибка запроса к серверу: {{ $root.error.message }}
             </div>`
});