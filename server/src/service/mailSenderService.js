const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

export function sendSuccessfulResetMail(email) {
    const mailOptions = {
        to: email,
        from: process.env.PEBLIO_SENDGRID_MAIL,
        subject: 'Peblio Password Reset Successful',
        text: `${'Hello,\n\n' +
            'This is a confirmation that the password for your account '}${email} has just been changed.\n`
    };
    return sendMail(mailOptions);
}

export function sendSignUpConfirmationMail(email, users, tokens) {
    let resetLinks = '';
    users.forEach((user, i) => {
        resetLinks += `Username: ${user}\n` +
            'Please click on the following link, or paste this into your browser to complete the process:\n' +
            `http://${process.env.PEBLIO_DOMAIN_NAME}/confirmation/${tokens[i]}\n\n`;
    });
    const mailOptions = {
        to: email,
        from: process.env.PEBLIO_SENDGRID_MAIL,
        subject: 'Peblio Confirmation',
        text: `You are receiving this because you have signed up for peblio.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n${
            resetLinks}`
    };
    sendMail(mailOptions);
}

export function sendResetMail(email, users, tokens) {
    /* eslint-disable */
    let resetLinks = '';
    users.forEach((user, i) => {
        resetLinks += `Username: ${user}\n` +
            `Go here to change the password ` +
            `http://${process.env.PEBLIO_DOMAIN_NAME}/reset/${tokens[i]}\n\n`
    })
    const mailOptions = {
        to: email,
        from: process.env.PEBLIO_SENDGRID_MAIL,
        subject: 'Peblio Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your user account at Peblio.\n' +
            'If you did not request this, please ignore this email and your password will  remain unchanged.\n' +
            'Here are the username(s) associated with this email address:\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            resetLinks

    };
    /* eslint-enable */
    sendMail(mailOptions);
}

function sendMail(mailOptions) {
    const options = {
        auth: {
            api_user: process.env.PEBLIO_SENDGRID_USER,
            api_key: process.env.PEBLIO_SENDGRID_PASSWORD
        }
    };

    const client = nodemailer.createTransport(sgTransport(options));
    client.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Message sent: ${info.response}`);
        }
    });
}