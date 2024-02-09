const twilio = require('twilio');

class Twilio {
    constructor() {
        this.client = null;
        this.phoneNumber = null;
        this.toPhoneNumber = null;
    }

    setValues(accountSid, authToken, phoneNumber) {
        this.client = twilio(accountSid, authToken);
        this.phoneNumber = phoneNumber;
    }

    async sendSmsToMultipleNumbers(body, numbers) {
        this.validateTwilioClient();

        console.log(`Sending SMS to ${numbers} with body: ${body}`);

        for (const number of numbers) {
            await this.client.messages.create({
                body,
                to: number,
                from: this.phoneNumber
            });
        }
    }

    async sendSms(body) {
        this.validateTwilioClient();

        console.log(`Sending SMS to ${this.toPhoneNumber} with body: ${body}`);

        return this.client.messages.create({
            body,
            to: this.toPhoneNumber,
            from: this.phoneNumber
        });
    }

    validateTwilioClient() {
        if (!this.client) {
            throw new Error('Twilio client not set');
        }
    }
}

class TwilioService {
    constructor() {
        throw new Error('Use TwilioService.getInstance()');
    }

    /**
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