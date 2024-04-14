class RaceTrack{
    constructor(trackType, maxCapacity) {
        this.trackType = trackType;
        this.maxCapacity = maxCapacity;
        this.currentCapacity = maxCapacity;
        this.bookedUntil = new Map(); 
    }
}