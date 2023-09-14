import { v4 as uuidv4 } from "uuid";
import {
  noStockEmail,
  purchaseEmail,
  purchaseEmailAndNoStock,
} from "../mailing/mailing.js";
import { TicketNotFound } from "../utils/custom-exceptions.js";
import TicketsRepository from '../repositories/tickets.repository.js'
import { Tickets } from "../dao/factory.js";

const ticketsDao = new Tickets()
const ticketsRepository = new TicketsRepository(ticketsDao)

const createTicket = async (purchaser, amount, productsWithoutStock) => {
  const purchase_datetime = new Date().toISOString();
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
  const result = ticketsRepository.create(ticket);
  return result;
};

const getTicketById = async (tid) => {
  const result = ticketsRepository.getById(tid);
  if (!result) {
    throw new TicketNotFound("Ticket not found");
  }
  return result;
};

export { createTicket, getTicketById };
