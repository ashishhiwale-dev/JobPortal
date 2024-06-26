const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const userModel = require('../models/userModel'); // Adjust the path to your user model

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).send({
      success: false,
      message: 'Phone Number is required',
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phoneNumber}`,
    });

    const user = await userModel.findOne({ phoneNumber });
    if (user) {
      user.otp = otp;
      await user.save();
    } else {
      const newUser = new userModel({ phoneNumber, otp });
      await newUser.save();
    }

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
