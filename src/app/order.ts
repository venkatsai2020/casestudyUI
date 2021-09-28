export class order{
    constructor(   
    public packag:String,
    public addOns:String,
    public dateTime:String,
    public washer:String,
    public scheduledLater: boolean,
    public instruction:String,
    public log_ref_id:String,
    ){}
}