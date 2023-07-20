import express from "express";
import './dao/dbConfig.js'
import ProductsRouter from "./routes/products.router.js";
import CartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import messagesRouter from "./routes/messages.router.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import SessionsRouter from "./routes/sessions.router.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import UsersRouter from "./routes/users.router.js";
import cors from 'cors'
import errorHandler from './middleware/errors/index.js'

const sessionsRouter = new SessionsRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
const usersRouter = new UsersRouter();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(express.static(`${__dirname}/public`));
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(
  session({
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      ttl: 3600,
    }),
    secret: "MaxShoes",
    resave: true,
    saveUninitialized: true,
  })
);

//PASSPORT
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//HANDLEBARS
app.use("/", viewsRouter);
app.use("/api/users", usersRouter.getRouter());
app.use("/api/sessions", sessionsRouter.getRouter());
app.use("/api/products", productsRouter.getRouter());
app.use("/api/carts", cartsRouter.getRouter());
app.use("api/messages", messagesRouter);
app.use("/realtimeproducts", viewsRouter);

app.use(errorHandler)

app.listen(8080, () => console.log("Server running on port 8080"));

// const productManager = new ProductManager();
// const messageManager = new MessageManager();

// const io = new Server(server);

// io.on("connection", async (socket) => {
//   const products = await productManager.getAll();
//   socket.emit("showProducts", products);
//   socket.on("addProduct", async (data) => {
//     await productManager.create(data);
//     const newProducts = await productManager.getAll();
//     io.emit("showProducts", newProducts);
//   });
//   socket.on("deleteProduct", async (data) => {
//     await productManager.delete(data);
//     io.emit("showProducts", await productManager.getAll());
//   });

//   socket.on("message", async (data) => {
//     await messageManager.create(data);
//     let messages = await messageManager.getAll();
//     io.emit("messageLogs", messages);
//   });
//   socket.on("authenticated", async (data) => {
//     let messages = await messageManager.getAll();
//     socket.emit("messageLogs", messages);
//     socket.broadcast.emit("newUserConnected", data);
//   });
// });
