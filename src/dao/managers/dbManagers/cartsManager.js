import cartModel from "../../models/carts.model.js";

export default class Cart {
  constructor() {
    console.log("Working carts with DB");
  }

  getAll = async () => {
    const carts = await cartModel.find();
    return carts;
  };

  create = async (cart) => {
    const newCart = await cartModel.create(cart);
    return newCart;
  };

  update = async (id, cart) => {
    const updatedCart = await cartModel.updateOne({ _id: id }, cart);
    return updatedCart;
  };

  delete = async (id) => {
    const deletedCart = await cartModel.deleteOne({ _id: id });
    return deletedCart;
  };
}
