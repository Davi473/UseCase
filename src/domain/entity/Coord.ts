export default class Coord
{
    lat: number;
    long: number;

    constructor(lat: number, long: number) 
    {
        if (lat < 0 || lat  > 90) throw new Error();
        if (long < 0 || long  > 90) throw  new Error();
        this.lat = lat;
        this.long = long;
    }
}