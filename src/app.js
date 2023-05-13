import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "../src/dao/managers/fileManagers/ProductManager.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/realtimeproducts", viewsRouter);
const productManager = new ProductManager("./src/dao/files/Products.json");
const server = app.listen(8080, () => console.log("Server running"));
const io = new Server(server);

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");
  const products = await productManager.getProducts();
  socket.emit("showProducts", products);
  socket.on("addProduct", async (data) => {
    await productManager.addProduct(data);
    const newProducts = await productManager.getProducts();
    io.emit("showProducts", newProducts);
  });
  socket.on("deleteProduct", async (data) => {
    await productManager.deleteProduct(data);

    io.emit("showProducts", await productManager.getProducts());
  });
});
