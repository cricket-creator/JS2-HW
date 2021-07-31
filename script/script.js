const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
  constructor (container) {
    this.container = container;
    this.products = [];
    this.#fetchProducts()
      .then(data => {
        this.products = [...data];
        this.#totalProductsPrice();
        this.renderProductsList();
      });
  }

  #fetchProducts () {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => console.log(error));
  }

  #totalProductsPrice () {
    return console.log(this.products.reduce((total, product) => total + product.price, 0));
  }

  renderProductsList () {
    const block = document.querySelector(this.container);
    for (const product of this.products) {
      const productObj = new Product(product);
      block.insertAdjacentHTML('beforeend', productObj.renderProduct());
    }
    this.#getProductInfo();
  }

  // В дальнейшем перестройка в метод addProductInCart
  #getProductInfo () {
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
        <p class="product__price">${this.product.price} руб.</p>
        <button class="product__btn" data-product_id="${this.product.id_product}">Купить</button>
      </div>`;
  }
}

const productsList = new ProductsList('.products-list');
productsList.renderProductsList();

const cartShowBtn = document.querySelector('#cart-id');

cartShowBtn.addEventListener('click', () => {
  const cart = document.querySelector('.cart');
  cart.classList.toggle('cart--is-closed');
  changeBtnWidth(cart);
});

class Cart {
  constructor (container) {
    this.container = container;
    this.cart = [];
    this.#fetchCartItems()
      .then(data => {
        this.cart = [...data.contents];
        this.#showCartTotalPrice();
        this.renderProductInCart();
      });
  }

  #fetchCartItems () {
    return fetch(`${API}/getBasket.json`)
      .then(cartItems => cartItems.json())
      .catch(error => console.log(error));
  }

  renderProductInCart () {
    const cartBlock = document.querySelector(this.container);
    for (const cartElement of this.cart) {
      const cartItem = new CartItem(cartElement);
      cartBlock.insertAdjacentHTML('beforeend', cartItem.renderCartItem());
    }
  }

  #showCartTotalPrice () {
    const totalPriceBlock = document.querySelector('.cart__total').querySelector('span');
    const totalPrice = this.cart.reduce((total, product) => total + product.price, 0);
    return totalPriceBlock.textContent = `Итого: ${totalPrice} руб.`;
  }
}

class CartItem {
  constructor (cartItem) {
    this.cartItem = cartItem;
  }

  renderCartItem () {
    return `
      <div class="cart-product cart-list__product">
        <h3 class="cart-product__title">${this.cartItem.product_name}</h3>
        <p class="cart-product__quantity">Кол-во: ${this.cartItem.quantity} шт.</p>
        <p class="cart-product__price">${this.cartItem.price} руб.</p>
        <button class="cart-product__btn" data-product_id="${this.cartItem.id_product}">x</button>
      </div>`;
  }
}

const cart = new Cart('.cart-list');
cart.renderProductInCart();

/*
const products = [
  { id: 1, title: 'Notebook', price: 2000, image: './images/products/Notebook.png', },
  { id: 2, title: 'Mouse', price: 20, image: './images/products/Mouse.png', },
  { id: 3, title: 'Keyboard', price: 200, image: './images/products/Keyboard.png', },
  { id: 4, title: 'Gamepad', price: 50, image: './images/products/Gamepad.png', },
];
*/

/*
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
*/

// <img className="product__image" src="${this.product.image}" alt="product-image">

function changeBtnWidth (elem) {
  if (elem.classList.contains('cart--is-closed')) {
    cartShowBtn.textContent = 'Корзина';

    let btnWidth = 40; // инструкция для увеличения ширины кнопки при нажатии
    const increaseBtnLength = setInterval(() => {
      cartShowBtn.style.width = `${btnWidth}px`;
      btnWidth++;
      btnWidth > 150 && clearInterval(increaseBtnLength);
    });
  } else {
    cartShowBtn.textContent = 'x';

    let btnWidth = 150; // инструкция для уменьшения ширины кнопки при нажатии
    const reduceBtnLength = setInterval(() => {
      cartShowBtn.style.width = `${btnWidth}px`;
      btnWidth--;
      btnWidth < 40 && clearInterval(reduceBtnLength);
    });
  }
}