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

  create = async (cart) => {
    const newCart = await cartModel.create(cart);
    return newCart;
  };

  addProductToCart = async (cid, pid) => {
    const cart = await this.getById(cid);
    const product = await productModel.findById(pid);
    const productInCart = cart.products.findIndex(
      (p) => p.product._id.toString() === pid.toString()
    );
    console.log(productInCart);
    if (productInCart === -1) {
      cart.products.push({
        product: product._id,
      });
    } else {
      cart.products[productInCart].quantity++;
    }

    const result = await this.update(cart._id, cart);
    return result;
  };

  modifyQuantity = async (cid, pid, quantity) => {
    const cart = await this.getById(cid);
    const productInCart = cart.products.findIndex(
      (p) => p.product.toString() === pid.toString()
    );
    if (productInCart !== -1) {
      cart.products[productInCart].quantity += quantity;
    }
    const result = await this.update(cart._id, cart);
    return result;
  };

  deleteProductInCart = async (cid, pid) => {
    const cart = await this.getById(cid);
    const productInCart = cart.products.findIndex(
      (p) => p.product._id.toString() === pid.toString()
    );
    console.log(productInCart);
    if (productInCart !== -1) {
      cart.products.splice(productInCart, 1);
    }

    const result = await this.update(cart._id, cart);
    return result;
  };

  update = async (id, cart) => {
    const updatedCart = await cartModel.updateOne({ _id: id }, cart);
    return updatedCart;
  };

  deleteAllProducts = async (cid) => {
    const cart = await this.getById(cid);
    cart.products.splice(0, cart.products.length);

    const result = await this.update(cart._id, cart);
    return result;
  };
}
