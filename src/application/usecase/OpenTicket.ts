import Ticket from "../../domain/entity/Ticket";
import Queue from "../../infra/queue/Queue";
import TicketRepository from "../repository/TicketRepository";
import EmailService from "../service/EmailService";
import IntegrationService from "../service/IntegrationService";
import PaymentService from "../service/PaymentService";

export default class OpenTicket 
{
    constructor (
        readonly ticketRepository: TicketRepository,
        readonly paymentService: PaymentService,
        readonly integrationService: IntegrationService,
        readonly emailService: EmailService,
        readonly queue: Queue
    ) {}

    async execute(input: Input): Promise<Output>
    {
        const ticket = Ticket.create(input.requesterId, input.content);
        await this.ticketRepository.save(ticket);
        // chamando um sistema externo
        // transacão de longa duração e distribuida
        //await this.paymentService.processPayment();
        //await this.integrationService.integrateWithTrello();
        //await this.emailService.sendEmail();
        await this.queue.publish("ticketOpened", ticket);
        return {
            ticketId: ticket.ticketId
        }
    }
}

type Input = {
    requesterId: string,
    content: string
}

type Output = {
    ticketId: string
}