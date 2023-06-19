import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import messagesRouter from "./routes/messages.router.js";
import handlebars from "express-handlebars";
import {__dirname} from "./utils.js";
import Sessions from './routes/sessions.router.js'
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from 'express-session'
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import UsersRouter from "./routes/users.router.js";

const sessionsRouter = new Sessions()
const usersRouter = new UsersRouter()
const app = express();

try {
  await mongoose.connect(
    "mongodb+srv://maximojhernandezla:Iru151220@cluster0mh.tlhs7mz.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );
  console.log("DB connected");
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//HANDLEBARS
app.use("/", viewsRouter);
app.use('/api/users', usersRouter.getRouter())
app.use('/api/sessions', sessionsRouter.getRouter())
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("api/messages", messagesRouter);
app.use("/realtimeproducts", viewsRouter);

const server = app.listen(8080, () => console.log("Server running on port 8080"));

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
