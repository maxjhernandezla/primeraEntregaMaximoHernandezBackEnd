import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }
  getCarts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(data);
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  getCartProductsById = async (id) => {
    const carts = await this.getCarts()
    const cartById = carts.find(c => c.id === id)
    if (!cartById) {
      return false
    } else {
      return cartById.products
    }
  }

  getCartById = async (id) => {
    const carts = await this.getCarts()
    const cartById = carts.find(c => c.id === id)
    if (!cartById) {
      return false
    } else {
      return cartById
    }
  }

  addCart = async () => {
    let cart = {
      products: []
    }
    try {
      const carts = await this.getCarts();
      if (carts.length === 0) {
        cart.id = 1;
      } else {
        cart.id = carts[carts.length - 1].id + 1;
      }
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
      return cart
    } catch (error) {
      console.log(error);
    }
  };

  addProductInCart = async (cart, product) => {
    let carts = await this.getCarts()
    const productByIndex = cart.products.findIndex(p => p.id === product.id)
    const cartByIndex = carts.findIndex(c => c.id === cart.id)
    if (productByIndex === -1) {
      product.quantity = 1;
      cart.products = [...cart.products, product]
      carts[cartByIndex] = cart
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
      return cart
    } 
    cart.products[productByIndex].quantity += 1;
    carts[cartByIndex] = cart
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    return cart
  }

  
}
