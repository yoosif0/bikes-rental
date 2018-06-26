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



function sendActivationCode(recepient, code) {
    return transporter.sendMail({
        from: senderEmail,
        to: recepient,
        subject: 'Activation Code',
        text: `Here is your Activation Code : ${code}`,
        html: `<p>Here is your Activation Code : ${code}</p>`
    }).then(info => {
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info))
    }).catch(err => { throw err })
}


function sendInvitation(recepient, url) {
    return transporter.sendMail({
        from: senderEmail,
        to: recepient,
        subject: 'Invitation to Calorie Metrics App',
        text: `Signup for this app that allows you to keep track of your daily caloric intake and provide you with useful analytics. ${url}`,
        html: `<p>Signup for this app that allows you to keep track of your daily caloric intake and provide you with useful analytics. ${url}</p>`
    }).then(info => {
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info))
    }).catch(err => { throw err })
}

module.exports  = { sendEmailWithCode, sendActivationCode, sendInvitation }
