export default interface Queue 
{
    publish (eventName: string, data: any): Promise<void>;
}