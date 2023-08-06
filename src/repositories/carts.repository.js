export default class CartsRepository {
  constructor(dao) {
    this.dao = dao
  }
  getAll = async () => {
    return await this.dao.getAll();
  };

  getById = async (id) => {
    return await this.dao.getById(id);
  };

  create = async () => {
    return await this.dao.create();
  };

  update = async (id, cart) => {
    return await this.dao.update(id, cart);
  };

  updateQuantity = async (cart) => {
    return await this.dao.updateQuantity(cart);
  };

  addToCart = async (cid, cart) => {
    return await this.dao.addProductToCart(cid, cart);
  };

  deleteAllProducts = async (cart) => {
    return await this.dao.deleteAllProducts(cart);
  };

  deleteProductInCart = async (cart) => {
    return await this.dao.deleteProductInCart(cart);
  };
}
