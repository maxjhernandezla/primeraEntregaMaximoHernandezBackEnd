import config from "../config/dotenv.config.js";

export let Users;
export let Products;
export let Carts;
export let Tickets;
export let Messages;

const persistence = process.env.PERSISTENCE;

switch (persistence) {
  case "MONGO":
    const mongoose = await import("mongoose");
    await mongoose.connect(process.env.MONGO_URL);
    const { default: UsersMongo } = await import(
      "./managers/dbManagers/usersManager.js"
    );
    const { default: CartsMongo } = await import(
      "./managers/dbManagers/cartsManager.js"
    );
    const { default: TicketsMongo } = await import(
      "./managers/dbManagers/ticketsManager.js"
    );
    const { default: MessagesMongo } = await import(
      "./managers/dbManagers/messagesManager.js"
    );
    const { default: ProductsMongo } = await import(
      "./managers/dbManagers/productsManager.js"
    );
    Users = UsersMongo;
    Carts = CartsMongo;
    Tickets = TicketsMongo;
    Messages = MessagesMongo;
    Products = ProductsMongo;
    break;
  case "FILE":
    // const { default: UsersFile } = await import ('./fileManagers/users.js');
    // Users = UsersFile;
    break;
}
