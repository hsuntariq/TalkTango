class PeerService {
    constructor() {
        this.peer = null;
        this.initializePeerConnection();
    }

    async getAnswer(offer) {
        try {
            await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await this.peer.createAnswer();
            await this.peer.setLocalDescription(answer);
            return answer;
        } catch (error) {
            console.error('Error getting answer:', error);
            throw error;
        }
    }

    async setLocalDescription(ans) {
        try {
            await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        } catch (error) {
            console.error('Error setting local description:', error);
            throw error;
        }
    }

    async getOffer() {
        try {
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(offer);
            return offer;
        } catch (error) {
            console.error('Error getting offer:', error);
            throw error;
        }
    }

    initializePeerConnection() {
        try {
            this.peer = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: [
                            "stun:stun.l.google.com:19302",
                            "stun:global.stun.twilio.com:3478",
                        ],
                    },
                ],
            });
        } catch (error) {
            console.error('Error initializing peer connection:', error);
            throw error;
        }
    }
}

export default new PeerService();
