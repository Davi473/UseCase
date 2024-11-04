import Ticket from "../../domain/entity/Ticket";

export default interface TicketRepository 
{
    save (ticket: Ticket): Promise<void>;
    get (ticketId: string): Promise<Ticket>;
    update (ticket: Ticket): Promise<void>;
}