import cartModel from "../../models/carts.model.js";
import productModel from "../../models/products.model.js";
export default class Cart {
  constructor() {
    console.log("Working carts with DB");
  }

  getAll = async () => {
    const carts = await cartModel.find();
    return carts;
  };

  getById = async (cid) => {
    const cart = await cartModel.findOne({ _id: cid }).lean();
    return cart;
  };

  create = async (products) => {
    const newCart = await cartModel.create(products);
    return newCart;
  };

  update = async (id, cart) => {
    const updatedCart = await cartModel.updateOne({ _id: id }, cart);
    return updatedCart;
  };

  addProductToCart = async (id, cart) => {
    const result = await this.update(id, cart);
    return result;
  };

  updateQuantity = async (cart) => {
    const result = await this.update(cart._id, cart);
    return result;
  };

  deleteProductInCart = async (cart) => {
    const result = await this.update(cart._id, cart);
    return result;
  };

  deleteAllProducts = async (cart) => {
    const result = await this.update(cart._id, cart);
    return result;
  };
}
