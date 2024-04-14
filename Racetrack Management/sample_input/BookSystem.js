class BookSystem{
    constructor() {
        this.regularTrack = new Racetrack("Regular", regularMaxCapacity);
        this.vipTrack = new Racetrack("VIP", vipMaxCapacity);
        this.revenueRegular = 0;
        this.revenueVIP = 0;
        
    }
}