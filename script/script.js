const products = [
  { id: 1, title: 'Notebook', price: 2000, image: './images/products/Notebook.png', },
  { id: 2, title: 'Mouse', price: 20, image: './images/products/Mouse.png', },
  { id: 3, title: 'Keyboard', price: 200, image: './images/products/Keyboard.png', },
  { id: 4, title: 'Gamepad', price: 50, image: './images/products/Gamepad.png', },
];

const renderProduct = (product) => {
  return `
    <div class="product products-list__product">
        <img class="product__image" src="${product.image}" alt="product-image">
        <h3 class="product__title">${product.title}</h3>
        <p class="product__price">${product.price}</p>
        <button class="product__btn" data-product-id="${product.id}">Купить</button>
    </div>
  `;
};

/*
const renderProductsList = products => {
  const productsList = document.querySelector('.products-list');
  products.forEach(product => {
    productsList.insertAdjacentHTML('beforeend', renderProduct(product));
  });
};

renderProductsList(products);
*/

const renderProductsList = list => {
  const productsList = list.map(item => renderProduct(item));
  console.log(productsList);
  document.querySelector('.products-list').innerHTML = productsList.join('');
};

renderProductsList(products);