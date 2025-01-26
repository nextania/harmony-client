class Call {
    constructor() {}
    connect() {
        const pc = new RTCPeerConnection();
        this.pc = pc; 
    }
}