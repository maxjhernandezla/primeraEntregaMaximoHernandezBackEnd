import express from "express";
import "./dao/dbConfig.js";
import ProductsRouter from "./routes/products.router.js";
import CartsRouter from "./routes/carts.router.js";
import ViewsRouter from "./routes/views.router.js";
import UsersRouter from "./routes/users.router.js";
import LoggerRouter from "./routes/logger.router.js";
import SessionsRouter from "./routes/sessions.router.js";
import messagesRouter from "./routes/messages.router.js";
import MockRouter from "./routes/mock.router.js";
import handlebars from "express-handlebars";
import { __mainDirname } from "./utils/utils.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cors from "cors";
import errorHandler from "./middlewares/errors/index.js";
import logger, { addLogger } from "./middlewares/logger.js";
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import config from "./config/dotenv.config.js";

const mockRouter = new MockRouter();
const viewsRouter = new ViewsRouter();
const sessionsRouter = new SessionsRouter();
const cartsRouter = new CartsRouter();
const usersRouter = new UsersRouter();
const loggerRouter = new LoggerRouter();
const productsRouter = new ProductsRouter();

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Max Shoes",
      description:
        "Ecommerce dedicado a la venta de zapatillas por Máximo Hernández",
    },
  },
  apis: [`${__mainDirname}/docs/**/*.yaml`],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(addLogger);

app.use(express.static(`${__mainDirname}/public`));

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

app.engine("handlebars", handlebars.engine());
app.set("views", `${__mainDirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter.getRouter());
app.use("/api/users", usersRouter.getRouter());
app.use("/api/sessions", sessionsRouter.getRouter());
app.use("/api/products", productsRouter.getRouter());
app.use("/api/carts", cartsRouter.getRouter());
app.use("/api/messages", messagesRouter);
app.use("/api/logger", loggerRouter.getRouter());
app.use("/api/mock", mockRouter.getRouter());

app.use(errorHandler);

app.listen(config.port, () => logger.info(`Server running on port: ${config.port}`));

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
