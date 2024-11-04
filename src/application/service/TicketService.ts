import crypto from "crypto";
import ticketDAO from "../dao/TicketDAO";
import PaymentService from "./PaymentService";
import IntegrationService from "./IntegrationService";
import EmailService from "./EmailService";

export default class TicketService
{
    constructor (
        readonly ticketDAO: ticketDAO,
        readonly paymentService: PaymentService,
        readonly integrationService: IntegrationService,
        readonly emailService: EmailService
    ) {}

    async openTicket (requesterId: string, content: string) 
    {
        const ticketId = crypto.randomUUID();
        // DTO - Data Transfer Object
        const ticket = {
            ticketId,
            requesterId,
            content,
            startDate: new Date(),
            status: "open"
        };
        await this.ticketDAO.save(ticket);
        await this.paymentService.processPayment();
        await this.integrationService.integrateWithTrello();
        await this.emailService.sendEmail();
    }

    async assingTicket (ticketId: string, assingneeId: string)
    {
        const ticket = await this.ticketDAO.get(ticketId);
        ticket.assingnneId = assingneeId;
        ticket.status = "assigneed";
        await this.ticketDAO.update(ticket);
    }

    async closeTicket (ticketId: string) 
    {
        const ticket = await this.ticketDAO.get(ticketId);
        if (ticket.status === "open") throw new Error("Ticket is not assigned");
        ticket.status = "closed";
        ticket.endDate = new Date();
        ticket.duration = ticket.endDate.getTime() - ticket.startDate.getTime();
        await this.ticketDAO.update(ticket);
    }

    importTickets () 
    {

    }

    exportTickets () 
    {

    }

    getTicket () 
    {

    }
}