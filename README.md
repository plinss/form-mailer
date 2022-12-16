# form-mailer

A simple NodeJS form mailer

Contact form build with Bootstrap and Nodemailer.

## Installation

1. Clone the Repo

```cli
npm install && npm start
```

2. Open in browser

```cli
http://localhost:3000
```

## Gmail SMTP Setup

1. Setup
2. Open app.js and change

```javascript
const smtpTrans = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 465,
    secure: true,
    auth: {
    user: "sender@example.com",  // Change it to yours email address
    pass: "password",     // App Password, (16 character Key)
    }
  })
```

### Configuration

Open app.js

```javascript
const mailOpts = {
    from: '"Contact Form" <sender@example.com>', //Sender mail
    to: "receiver@example.com",     // Receiver mail
    subject: `${req.body.name}`,
    html: output
  }
```
