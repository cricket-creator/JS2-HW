const add = (cart, req) => {
  cart.contents.push(req.body);
  return JSON.stringify(cart, null, 4);
};

const change = (cart, req) => {
  const find = cart.contents.find(item => item.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  return JSON.stringify(cart, null, 4);
};

const remove = (cart, req) => {
  const find = cart.contents.find(item => item.id_product === +req.params.id);
  find.quantity -= req.body.quantity;
  return JSON.stringify(cart, null, 4);
};

module.exports = { add, change, remove };