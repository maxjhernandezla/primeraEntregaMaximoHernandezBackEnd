import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        return products;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (product) => {
    try {
      const products = await this.getProducts();
      if (products.length === 0) {
        product.id = 1;
      } else {
        product.id = products[products.length - 1].id + 1;
      }
      products.push(product);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      // const codeControl = products.find((p) => p.code === product.code);
      // if (codeControl) {
      //   console.error("No puede haber codes repetidos");
      //   return;
      // } else {
      // }
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (id) => {
    const products = await this.getProducts();
    const productById = products.find((p) => p.id === id);
    if (!productById) {
      return false
    } else {
      return productById;
    }
  };

  updateProduct = async (updateId, productUpdate) => {
    const products = await this.getProducts();
    const originalProductIndex = products.findIndex((p) => p.id === updateId);
    if (originalProductIndex === -1) {
      return false;
    } else {
      products[originalProductIndex] = {
        ...products[originalProductIndex],
        ...productUpdate,
      };
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      return products[originalProductIndex]
    }
  };

  deleteProduct = async (deleteId) => {
    const products = await this.getProducts();
    const productByIndex = products.findIndex((p) => p.id === deleteId);
    if (productByIndex === -1) {
      return false;
    } else {
      products.splice(productByIndex, 1);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      return true;
    }
  };
}
