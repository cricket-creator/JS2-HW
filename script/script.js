const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
  constructor (container, url, list = list2) {
    this.container = container;
    this.url = url;
    this.list = list;
    this.goods = [];
    this.allProducts = [];
  }

  getData (url) {
    return fetch(url ? url : `${API + this.url}`)
      .then(data => data.json())
      .catch(error => console.log(error));
  }

  pushData (data) {
    this.goods = [...data];
    this.render();
  }

  render () {
    const block = document.querySelector(this.container);
    for (const good of this.goods) {
      const goodObj = new this.list[this.constructor.name](good);
      // console.log(goodObj, `Каждый элемент ${this.constructor.name}`);
      this.allProducts.push(goodObj);
      block.insertAdjacentHTML('beforeend', goodObj.render());
    }
    // console.log(this.allProducts, `allProducts ${this.constructor.name}`);
    this.init();
  }

  getTotalPrice () {
    return this.allProducts.reduce((total, product) => total + product.price, 0);
  }

  init () {
    // events
  }
}

class Item {
  constructor (product) {
    this.product = product;
  }

  render () {
    // HTML code
  }
}

class Catalog extends List {
  constructor (cart, container = '.products-list', url = '/catalogData.json') {
    super(container, url);
    this.cart = cart;
    this.getData()
      .then(data => this.pushData(data));
  }

  init () {
    const productBtns = document.querySelector(this.container).querySelectorAll('.product__btn');
    productBtns.forEach(productBtn => {
      productBtn.addEventListener('click', evt => {
        const productId = +evt.target.dataset.id;
        // console.log(this.allProducts);
        const product = this.allProducts.find(product => product.product.id_product === productId);
        // console.log(product);
        this.cart.addProduct(product);
      });
    });

    /*
    block.addEventListener('click', evt => {
      if (evt.target.classList.contains('product__btn')) {
        const productId = +evt.target.dataset.id;
        const product = this.allProducts.find(product => product.product.id_product === productId);
        // console.log(product);
        this.cart.addProduct(product);
      }
    });
    */

    /*const productBtns = document.querySelector(this.container).querySelectorAll('.product__btn');
    productBtns.forEach(productBtn => {
      productBtn.addEventListener('click', evt => {
        const productId = +evt.target.dataset.id;
        const product = this.allProducts.find(product => product.product.id_product === productId);
        console.log(product);
      });
    });*/
  }
}

class CatalogItem extends Item {
  constructor (product) {
    super(product);
  }

  render () {
    return `
      <div class="product products-list__product">
        <h3 class="product__title">${this.product.product_name}</h3>
        <p class="product__price">${this.product.price} руб.</p>
        <button class="product__btn" data-id="${this.product.id_product}">Купить</button>
      </div>`;
  }
}

class Cart extends List {
  constructor (container = '.cart-list', url = '/getBasket.json') {
    super(container, url);
    this.getData()
      .then(data => this.pushData(data.contents));
  }

  addProduct (product) {
    this.getData(`${API}/addToBasket.json`)
      .then(data => {
        if (data.result === 1) {
          const productId = product.product.id_product;
          // console.log(this.allProducts);
          const find = this.allProducts.find(product => product.product.id_product === productId);
          console.log(find);
          if (find) {
            find.quantity++;
            // console.log(find);
            this.updateCart(find);
          } else {
            const find = this.goods.find(product => product.id_product === productId);
            let item = {
              id_product: find.id_product,
              product_name: find.product_name,
              price: find.price,
              quantity: 1,
            };
            this.goods = [item];
            this.render();
          }
        } else {
          alert('Error');
        }
      });
  }

  removeProduct (product) {
    this.getData(`${API}/deleteFromBasket.json`)
      .then(data => {
        if (data.result === 1) {
          // console.log(product);
          const productId = product.product.id_product;
          const find = this.allProducts.find(product => product.product.id_product === productId);
          if (find.quantity > 1) {
            find.quantity--;
            this.updateCart(find);
          } else {
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart-product__btn[data-id="${find.product.id_product}"]`)
              .closest('.cart-product')
              .remove();
          }
        }
      });
  }

  updateCart (product) {
    const block = document.querySelector(`.cart-product__btn[data-id="${product.product.id_product}"]`)
      .closest('.cart-product');
    // console.log(cartProduct);
    block.querySelector('.cart-product__quantity')
      .textContent = `Кол-во: ${product.quantity} шт.`;
    block.querySelector('.cart-product__price')
      .textContent = `${product.product.price * product.quantity} руб.`;
  }

  init () {
    const cartBtn = document.querySelector('#cart-id');
    cartBtn.addEventListener('click', () => {
      const cart = document.querySelector('.cart');
      cart.classList.toggle('cart--is-closed');
      changeBtnWidth(cartBtn, cart);
    });

    const cartProductBtns = document.querySelector(this.container).querySelectorAll('.cart-product__btn');
    cartProductBtns.forEach(cartProductBtn => {
      cartProductBtn.addEventListener('click', evt => {
        const cartProductId = +evt.target.dataset.id;
        // console.log(this.allProducts);
        const cartProduct = this.allProducts.find(product => product.product.id_product === cartProductId);
        // console.log(cartProduct);
        this.removeProduct(cartProduct);
      });
    });
  }
}

class CartItem extends Item {
  constructor (product) {
    super(product);
    this.quantity = product.quantity;
  }

  render () {
    return `
      <div class="cart-product cart-list__product">
        <h3 class="cart-product__title">${this.product.product_name}</h3>
        <p class="cart-product__quantity">Кол-во: ${this.product.quantity} шт.</p>
        <p class="cart-product__price">${this.product.price} руб.</p>
        <button class="cart-product__btn" data-id="${this.product.id_product}">x</button>
      </div>`;
  }
}

const list2 = {
  Catalog: CatalogItem,
  Cart: CartItem,
};

let cart = new Cart();
let pli = new Catalog(cart);

// let Catalog = new List('.products', 'catalogData.json');

/*
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
*/

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

function changeBtnWidth (btn, elem) {
  if (elem.classList.contains('cart--is-closed')) {
    btn.textContent = 'Корзина';

    let btnWidth = 40; // инструкция для увеличения ширины кнопки при нажатии
    const increaseBtnLength = setInterval(() => {
      btn.style.width = `${btnWidth}px`;
      btnWidth++;
      btnWidth > 150 && clearInterval(increaseBtnLength);
    });
  } else {
    btn.textContent = 'x';

    let btnWidth = 150; // инструкция для уменьшения ширины кнопки при нажатии
    const reduceBtnLength = setInterval(() => {
      btn.style.width = `${btnWidth}px`;
      btnWidth--;
      btnWidth < 40 && clearInterval(reduceBtnLength);
    });
  }
}