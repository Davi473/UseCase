import TicketRepository from "../repository/TicketRepository";

export default class CloseTicket 
{
    constructor ( readonly ticketRepository: TicketRepository) {}

    async execute (input: Input): Promise<void> 
    {
        const ticket = await this.ticketRepository.get(input.ticketId);
        ticket.close();
        await this.ticketRepository.update(ticket);
    }
}

type Input = {
    ticketId: string,
    assigneeId: string
}