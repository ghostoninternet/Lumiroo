const nodemailer = require('nodemailer');
const { APP_PASSWORD, APP_EMAIL } = require('../configs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: APP_EMAIL,
    pass: APP_PASSWORD
  }
});

const sendEmail = async ({ email, subject, text }) => {
  const mailOptions = {
    from: APP_EMAIL,
    to: email,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  sendEmail,
}