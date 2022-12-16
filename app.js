// Import Package
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const pass = require('./pass');

// Set Package
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

// Server Start Notification
app.listen(process.env.PORT || 30000, '127.0.0.1', () => console.log("Server Started on port 30000..."));

// Get Index Page Request
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
});

// POST route from survey form
app.post('/survey', (req, res) => {

  // Email Template
  const output = `
      <h1>Chart Usability Study</h1>
      <ul>
        <li>Question 1: ${req.body.q_1}</li>
        <li>Question 2: ${req.body.q_2}</li>
        <li>Question 3: ${req.body.q_3}</li>
        <li>Question 4: ${req.body.q_4}</li>
        <li>Question 5: ${req.body.q_5}</li>
        <li>Question 6: ${req.body.q_6}</li>
        <li>Question 7: ${req.body.q_7}</li>
        <li>Question 8: ${req.body.q_8}</li>
        <li>Question 9: ${req.body.q_9}</li>
        <li>Question 10: ${req.body.q_10}</li>
        <li>Question 11: ${req.body.q_11}</li>
        <li>Question 12: ${req.body.q_12}</li>
        <li>Question 13: ${req.body.q_13}</li>
        <li>Question 14: ${req.body.q_14}</li>
        <li>Question 15: ${req.body.q_15}</li>
        <li>Question 16: ${req.body.q_16}</li>
        <li>Question 17:
          <ul>
            <li>bar:  ${req.body.bar}</li>
            <li>line:  ${req.body.line}</li>
            <li>pie:  ${req.body.pie}</li>
            <li>histogram:  ${req.body.histogram}</li>
            <li>scatter:  ${req.body.scatter}</li>
            <li>heat:  ${req.body.heat}</li>
            <li>alluvial:  ${req.body.alluvial}</li>
          </ul>
        </li>
        <li>Question 18:
          <ul>
            <li>screen_reader:  ${req.body.screen_reader}</li>
            <li>screen_magnifier:  ${req.body.screen_magnifier}</li>
            <li>dark_mode:  ${req.body.dark_mode}</li>
            <li>braille_display:  ${req.body.braille_display}</li>
            <li>voice_control_system:  ${req.body.voice_control_system}</li>
            <li>other_at:  ${req.body.other_at}</li>
          </ul>
        </li>
        <li>Question 19: ${req.body.screen_reader_used}</li>
        <li>Question 20: ${req.body.browser}</li>
      </ul>
    `;

  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.fizz.studio',
    port: 465,
    secure: true,
    auth: {
      user: "mail-relay@fizz.studio", // Sender email username
      pass: pass.word, // Sender email password, not the normal one.
    }
  })


  // Specify what the email will look like
  const mailOpts = {
    from: '"Chart Usability Study" <mail-relay@fizz.studio>', //Sender mail
    to: "research@fizz.studio",					// Recever mail
    // subject: `${req.body.name}`,
    subject: 'Chart Usability Study',
    html: output
  }

  // Send mail with defined transport object
  smtpTrans.sendMail(mailOpts, (error, info) => {
    if (error) {
      res.send('<h1 style="color:red">Something went wrong.</h1>');
    }
    res.send('<h1 style="color: green">Thank you, survey has been submitted.');
  });

})
