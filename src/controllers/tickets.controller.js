import * as ticketService from "../services/tickets.service.js";

const getTicketById = async (req, res) => {
  try {
    const { tid } = req.params;
    const ticket = await ticketService.getTicketById(tid);
    res.sendSuccess(ticket);
  } catch (error) {
    if (error instanceof TicketNotFound) {
      res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};
