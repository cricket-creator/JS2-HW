const products = [
  { id: 1, title: 'Notebook', price: 2000 },
  { id: 2, title: 'Mouse', price: 20 },
  { id: 3, title: 'Keyboard', price: 200 },
  { id: 4, title: 'Gamepad', price: 50 },
];

const renderProduct = (title, price) => {
  return `
    <div class="product product-list__product">
        <h3 class="product__title">${title}</h3>
        <p class="product__price">${price}</p>
        <button class="product__btn">Купить</button>
    </div>
  `;
};

const renderProductsList = list => {
  const productsList = list.map(item => renderProduct(item.title, item.price));
  console.log(productsList);
  document.querySelector('.products-list').innerHTML = productsList;
};

renderProductsList(products);