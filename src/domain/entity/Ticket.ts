import crypto from "crypto";
import { request } from "express";

export default class Ticket 
{
    assigneeId?: string;
    endDate?: Date;
    duration?: number;

    constructor (readonly ticketId: string, readonly requesterId: string, readonly content: string, readonly startDate: Date, private status: string) {}

    static create (requesterId: string, content: string) 
    {
        const ticketId = crypto.randomUUID();
        const startDate = new Date();
        const status = "open";
        return new Ticket(ticketId, requesterId, content, startDate, status);
    }

    assign (assigneeId: string)
    {
        this.status = "assigned";
        this.assigneeId = assigneeId;
    }

    close ()
    {
        if (this.status === "open") throw new Error("Ticket is not assigned");
        this.status = "closed";
        this.endDate = new Date();
        this.duration = this.endDate.getTime() - this.startDate.getTime();
    }
    
    getStatus ()
    {
        return this.status;
    }
}