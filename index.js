const {exec} = require("child_process");
console.log("Initialising Twilio...")
require('dotenv').config();
const TwilioService = require('./services/TwilioService').getInstance();
TwilioService.setValues(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_PHONE_NUMBER, process.env.TWILIO_TO_PHONE_NUMBER);
console.log("Twilio initialised")
console.log("Checking power every 5 seconds...")
let wasLastCheckNegative = false;

setInterval(async () => {
    // Basically. In the same folder as this file there is a python script that checks the power of a device. I need to call that script and get the power value
    const { exec } = require('child_process');
    exec('python3 CurrentReading.py', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        // It returns like this: " 0.00 A" so I need to remove the " A" and the space
        let power = stdout.replace(' A', '');
        // There is also a trailing space before the number so I need to remove that
        power = power.trim();
        if (power.includes("-")) {
            if(!wasLastCheckNegative) {
                wasLastCheckNegative = true;
                return;
            }
            // If there is a - in the string then the power is negative and we need to send a message
            TwilioService.sendSmsToMultipleNumbers(`Power to the boiler has been cut.`, [process.env.TWILIO_TO_PHONE_NUMBER, process.env.TWILIO_TO_PHONE_NUMBER_2]).then(() => {
                exec('sudo shutdown -h now', (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(stdout);
                });
            });
        }
    });
}, 5000);