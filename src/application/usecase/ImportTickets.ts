import OpenTicket from "./OpenTicket";

export default class importTickets
{
    constructor (readonly openTicket: OpenTicket) {}

    async execute (input: Input): Promise<void>
    {
        for (const ticketInput of input.tickets)
        {
            await this.openTicket.execute(ticketInput);
        }
    }
}

type Input = {
    tickets: { requesterId: string, content: string } []
}