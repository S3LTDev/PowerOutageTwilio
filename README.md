# Power Outage Checker 🚀

## Overview

This project is a power outage checker designed for a Raspberry Pi 4B equipped with a UPS hat, 2x lithium-ion batteries, and the necessary software dependencies. It utilizes a UPS hat to provide uninterrupted power to the Raspberry Pi during outages and a combination of Node.js and Python scripts to monitor and notify users of power status changes.

## Prerequisites

- Raspberry Pi 4B: [Link to Raspberry Pi 4 Model B](https://thepihut.com/products/raspberry-pi-4-model-b)
- UPS Hat: [Link to UPS Hat](https://thepihut.com/products/uninterruptible-power-supply-ups-hat-b-for-raspberry-pi?variant=41409963425987)
- 2x Lithium-ion Batteries: [Link to Batteries](https://thepihut.com/products/18650-lithium-ion-rechargeable-cell-3000mah-3-7v-15a?variant=42012653813955)

## Setup Instructions

### Software Dependencies

1. **Node.js:** Ensure Node.js is installed on your Raspberry Pi. If not, you can download and install it from [Node.js official website](https://nodejs.org/).

2. **Python 3 with pip:** Make sure you have Python 3 installed. Install pip using the command:

   ```bash
   sudo apt-get install python3-pip
   ```

3. **smbus Python Library:** Install the smbus Python library using the command:

   ```bash
   pip install smbus
   ```
   If this doesn't work, try using the following command:

   ```sudo apt-get install python3-smbus```

4. **Node.js Packages:** Navigate to the project directory and install Node.js packages:

   ```bash
   npm install
   ```

5. **Twilio Account:** Create a Twilio account and obtain your account SID, auth token, and Twilio phone number. You will need these to send SMS notifications.

6. **Environment Variables:** Create a `.env` file in the project directory and add the following environment variables:

   ```bash
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   TWILIO_TO_PHONE_NUMBER=your_phone_number
   ```

   Replace `your_account_sid`, `your_auth_token`, `your_twilio_phone_number`, and `your_phone_number` with your Twilio account SID, auth token, Twilio phone number, and your phone number, respectively.
   Ensure that you have the `TWILIO_TO_PHONE_NUMBER` phone number in the format `+1234567890` with the country code. You
   can set the `TWILIO_PHONE_NUMBER` as a short code or a long code, depending on your Twilio account settings.
      
   ## Multiple Numbers
   If you would like to add more numbers to be notified, you can add them into the `.env` file and add them to the array on line `15` in `index.js`.

### UPS Hardware Assembly

Follow the UPS assembly video for the Raspberry Pi UPS hat: [UPS Assembly Video](https://youtu.be/p86AbqgRaIo?t=401).

### PM2 Setup (Optional)
PM2 is a process manager for Node.js applications that allows you to keep your application running in the background, restart it automatically on crash, and start it on boot. You can use PM2 to run the power outage checker script in the background and ensure that it starts on boot.

1. Install PM2 globally:

   ```bash
   sudo npm install -g pm2
   ```

2. Start the power outage checker script using PM2:

   ```bash
   pm2 start index.js
   ```

   Ensure that you have configured the Twilio service and environment variables as needed in your Node.js script.


3. Give PM2 permission to automatically start on boot:

   ```bash
   pm2 startup
   ```

   Copy the command provided by PM2 and run it in the terminal.


4. Save the PM2 process list to automatically start on boot:

   ```bash
   pm2 save
   ```

You will now have the power outage checker running in the background and set to start on boot.
You will get a message when the power goes out and when it comes back on.
## Usage

The power outage checker will now run in the background, checking for power status changes and sending notifications via Twilio when necessary.

Feel free to contribute, report issues, or suggest improvements!