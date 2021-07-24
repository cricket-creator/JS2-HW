const products = [
  { id: 1, title: 'Notebook', price: 2000, image: './images/products/Notebook.png', },
  { id: 2, title: 'Mouse', price: 20, image: './images/products/Mouse.png', },
  { id: 3, title: 'Keyboard', price: 200, image: './images/products/Keyboard.png', },
  { id: 4, title: 'Gamepad', price: 50, image: './images/products/Gamepad.png', },
];

class ProductsList {
  constructor (container) {
    this.container = container;
    this.products = [];
  }

  _fetchProducts (products) {
    this.products = products;
  }

  renderProductsList () {
    const block = document.querySelector(this.container);
    this.products.forEach(product => {
      product = new Product(product);
      block.insertAdjacentHTML('beforeend', product.renderProduct());
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
        <button class="product__btn" data-product-id="${this.product.id}">Купить</button>
    </div>
    `;
  }
}

const productsList = new ProductsList('.products-list');
productsList._fetchProducts(products);
productsList.renderProductsList();