export default class Email 
{
    value: string;

    constructor (email: string)
    {
        // regex pra validar o email
        this.value = email;
    }
}