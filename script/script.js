/*
const products = [
  { id: 1, title: 'Notebook', price: 2000, image: './images/products/Notebook.png', },
  { id: 2, title: 'Mouse', price: 20, image: './images/products/Mouse.png', },
  { id: 3, title: 'Keyboard', price: 200, image: './images/products/Keyboard.png', },
  { id: 4, title: 'Gamepad', price: 50, image: './images/products/Gamepad.png', },
];
*/

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
  constructor (container) {
    this.container = container;
    this.products = [];
  }

  fetchProducts () {
    fetch(`${API}/catalogData.json`)
      .then(str => str.json())
      .then(data => {
        data.forEach(el => {
          this.products.push(el);
          return this.products;
        });
      })
      .then(() => {
        this.#totalProductsPrice(this.products);
        this.#renderProductsList();
        this.getProductInfo();
      });
  }

  #totalProductsPrice () {
    return console.log(this.products.reduce((total, product) => total + product.price, 0));
  }

  #renderProductsList () {
    const block = document.querySelector(this.container);
    this.products.forEach(product => {
      let dataProduct = new Product(product);
      block.insertAdjacentHTML('beforeend', dataProduct.renderProduct());
    });
  }

  // В дальнейшем перестройка в метод addProductInCart
  getProductInfo () {
    const productBtns = document.querySelectorAll('.product__btn');
    productBtns.forEach(productBtn => {
      productBtn.addEventListener('click', evt => {
        const productInfo = this.products.find(product => {
          return product.id_product === parseInt(evt.target.dataset.product_id);
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
        <h3 class="product__title">${this.product.product_name}</h3>
        <p class="product__price">${this.product.price}</p>
        <button class="product__btn" data-product_id="${this.product.id_product}">Купить</button>
    </div>
    `;
  }
}

const productsList = new ProductsList('.products-list');
productsList.fetchProducts();

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

// <img className="product__image" src="${this.product.image}" alt="product-image">