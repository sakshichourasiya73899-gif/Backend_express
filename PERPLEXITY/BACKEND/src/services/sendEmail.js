import nodemailer from "nodemailer"
import transporter from "./transporter_Email.js"
// Function to send email
const sendEmail = async ({to, subject, text, html}) => { //why to write this inside curly baraces
  try {
    const info = await transporter.sendMail({
      from: `"Perplexity" <${process.env.GOOGLE_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    console.log('Email sent successfully to:', to);
    console.log('Email details:', { to, subject, text, html });
    console.log('Email server response:', info);
    console.log('Email transporter configuration:', transporter.options);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail