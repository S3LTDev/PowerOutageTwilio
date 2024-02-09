// Create a singleton for a class that will be used to send SMS messages with a short code

const twilio = require('twilio');

class Twilio {
    constructor() {
        this.client = null;
        this.phoneNumber = null;
        this.toPhoneNumber = null;
    }

    setValues(accountSid, authToken, phoneNumber, toPhoneNumber) {
        this.client = twilio(accountSid, authToken);
        this.phoneNumber = phoneNumber;
        this.toPhoneNumber = toPhoneNumber;
    }

    async sendSmsToMultipleNumbers(body, numbers) {
        if (!this.client) {
            throw new Error('Twilio client not set');
        }
        console.log(`Sending SMS to ${numbers} with body: ${body}`);
        for (let number of numbers) {
            await this.client.messages.create({
                body,
                to: number,
                from: this.phoneNumber
            });
        }
    }

    async sendSms(body) {
        if (!this.client) {
            throw new Error('Twilio client not set');
        }
        console.log(`Sending SMS to ${this.toPhoneNumber} with body: ${body}`);
        return this.client.messages.create({
            body,
            to: this.toPhoneNumber,
            from: this.phoneNumber
        });
    }
}

class TwilioService {
    constructor() {
        throw new Error('Use TwilioService.getInstance()');
    }

    /**
     *
     * @returns {Twilio}
     */
    static getInstance() {
        if (!TwilioService.instance) {
            TwilioService.instance = new Twilio();
        }
        return TwilioService.instance;
    }
}

module.exports = TwilioService;