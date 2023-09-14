import { TICKETS_DAO } from "../dao/index.js";

export default class TicketsRepository {
  getById = async (tid) => {
    return await TICKETS_DAO.getById(tid);
  };

  create = async (ticket) => {
    return await TICKETS_DAO.create(ticket);
  };
 
}
