const products = [
  { id: 1, title: 'Notebook', price: 2000, image: './images/products/Notebook.png', },
  { id: 2, title: 'Mouse', price: 20, image: './images/products/Mouse.png', },
  { id: 3, title: 'Keyboard', price: 200, image: './images/products/Keyboard.png', },
  { id: 4, title: 'Gamepad', price: 50, image: './images/products/Gamepad.png', },
];

/*
const cart = [];
*/

class ProductsList {
  constructor (container) {
    this.container = container;
    this.products = [];
  }

  #fetchProducts (products) {
    this.products = products;
    this.#totalProductsPrice();
  }

  #totalProductsPrice () {
    let sum = 0;
    this.products.forEach(product => {
      return sum += product.price;
    });
    console.log(sum); // Суммарную стоимость всех товаров
  }

  renderProductsList () {
    this.#fetchProducts(products);

    const block = document.querySelector(this.container);
    this.products.forEach(product => {
      product = new Product(product);
      block.insertAdjacentHTML('beforeend', product.renderProduct());
    });

    this.getProductInfo();
  }

  // В дальнейшем перестройка в метод addProductInCart
  getProductInfo () {
    const productBtns = document.querySelectorAll('.product__btn');
    productBtns.forEach(productBtn => {
      productBtn.addEventListener('click', evt => {
        const productInfo = this.products.find(product => {
          return product.id === parseInt(evt.target.dataset.product_id);
        });
        console.log(productInfo);
      });
    });
  }
}

class Product {
  constructor (product) {
    this.product = product;
  }

  renderProduct () {
    return `
      <div class="product products-list__product">
        <img class="product__image" src="${this.product.image}" alt="product-image">
        <h3 class="product__title">${this.product.title}</h3>
        <p class="product__price">${this.product.price}</p>
        <button class="product__btn" data-product_id="${this.product.id}">Купить</button>
    </div>
    `;
  }
}

const productsList = new ProductsList('.products-list');
productsList.renderProductsList(products);

/*
class Cart {
  constructor (container) {
    this.container = container;
    this.cart = [];
  }

  renderProductInCart () {

  }

  showTotalPrice () {

  }
}
*/
