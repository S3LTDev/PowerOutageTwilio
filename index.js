const { exec } = require("child_process");
console.log("Initializing Twilio...");
require('dotenv').config();
const TwilioService = require('./services/TwilioService').getInstance();
TwilioService.setValues(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_PHONE_NUMBER);
console.log("Twilio initialized");
console.log("Checking power every 5 seconds...");
let oneCheck = false;
let twoCheck = false; // These values are for double-checking before sending a message to make sure the power is actually out
let powerOut = false;
let numbersToText = [process.env.TWILIO_TO_PHONE_NUMBER];
setInterval(async () => {
    const { exec } = require('child_process');
    exec('python3 CurrentReading.py', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        let power = stdout.replace(' A', '');
        power = power.trim();
        let powerNum = parseFloat(power);
        if (isNaN(powerNum)) {
            console.error("Power is not a number");
            return;
        }
        let powerConnected = true;
        if (powerNum < -0.25) { // Sometimes, the power does go in the negatives even when it's connected
            powerConnected = false; // This value is a safe value to use to check if the power is connected
        }
        if (power.includes("-") && powerConnected === false) {
            if (!oneCheck) {
                oneCheck = true;
                return;
            }
            if (!twoCheck) {
                twoCheck = true;
                return;
            }
            if (powerOut) {
                return; // We already know the power is out, so we don't need to send another message
            }

            TwilioService.sendSmsToMultipleNumbers(`Power has been cut.`, numbersToText).then(() => {
                powerOut = true;
            });
        } else {
            oneCheck = false;
            twoCheck = false;
            if (powerOut) {
                TwilioService.sendSmsToMultipleNumbers(`Power has been restored.`, numbersToText).then(() => {
                    powerOut = false;
                });
            }
        }
    });
}, 5000);