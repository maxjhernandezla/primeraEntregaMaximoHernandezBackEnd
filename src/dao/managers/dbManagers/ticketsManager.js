import ticketsModel from '../../models/tickets.model.js'

export default class Ticket {
    contructor() {
        console.log('Working tickets with DB');
    }

    create = async (ticket) => {
        const result = await ticketsModel.create(ticket)
        return result
    }
}