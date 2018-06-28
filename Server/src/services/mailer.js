const nodemailer = require('nodemailer')
const envDpendendentMailConfig = require('config/mailer.config')
const senderEmail = envDpendendentMailConfig.auth.user
const transporter = nodemailer.createTransport(envDpendendentMailConfig);



function sendEmailWithCode(recepient, code) {
    return transporter.sendMail({
        from: senderEmail,
        to: recepient,
        subject: 'Password Recovery Code',
        text: `Here is your password recovery code: ${code}`,
        html: `<p>Here is your password recovery code: ${code}</p>`
    }).then(info => {
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info))
    }).catch(err => { throw err })
}


module.exports  = { sendEmailWithCode }
