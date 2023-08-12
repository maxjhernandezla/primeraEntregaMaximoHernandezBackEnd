import logger from '../../../middlewares/logger.js';
import ticketsModel from '../../models/tickets.model.js'

export default class Ticket {
    contructor() {
        logger.info('Working tickets with DB');
    }

    create = async (ticket) => {
        const result = await ticketsModel.create(ticket)
        return result
    }

    getAll = async (ticket) => {
        const result = await ticketsModel.find()
        return result
    }
}