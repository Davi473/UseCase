create branas.user
{
    user_id uuid primary key,
    name text,
    email text
    lat numeric,
    log numeric
}

create branas.ticket 
{
    ticket_id uuid primary key,
    requester_id uuid references branas.user (user_id),
    assignee_id uuid references branas.user (user_id),
    content text,
    status text,
    start_date timestamp,
    end_date timestamp,
    duration int
}