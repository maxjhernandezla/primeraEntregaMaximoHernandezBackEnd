import { TICKETS_DAO } from "../dao/index.js";
import { v4 as uuidv4 } from "uuid";
import {
  noStockEmail,
  purchaseEmail,
  purchaseEmailAndNoStock,
} from "../mailing/mailing.js";

const createTicket = async (purchaser, amount, productsWithoutStock) => {
  console.log(productsWithoutStock);
  const purchase_datetime = Date.now();
  const code = uuidv4();
  const ticket = {
    purchaser,
    amount,
    code,
    purchase_datetime,
  };
  if (productsWithoutStock.length > 0 && amount === 0) {
    await noStockEmail(purchaser);
  } else if (productsWithoutStock.length === 0 && amount > 0) {
    await purchaseEmail(ticket);
  } else if (productsWithoutStock.length > 0 && amount > 0) {
    await purchaseEmailAndNoStock(ticket);
  }
  const result = TICKETS_DAO.create(ticket);
  return result;
};

export { createTicket };
