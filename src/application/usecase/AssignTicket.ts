import TicketRepository from "../repository/TicketRepository";

export default class AssignTicket 
{
    constructor ( readonly ticketRepository: TicketRepository) {}

    async execute (input: Input): Promise<void> 
    {
        const ticket = await this.ticketRepository.get(input.ticketId);
        ticket.assign(input.assigneeId);
        await this.ticketRepository.update(ticket);
    }
}

type Input = {
    ticketId: string,
    assigneeId: string
}