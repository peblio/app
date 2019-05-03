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

export function sendSignUpNotificationMail(email, user) {
    const mailOptions = {
        to: email,
        from: process.env.PEBLIO_SENDGRID_MAIL,
        subject: 'Peblio Confirmation',
        text: 'Hello from Peblio! \n'
        + 'Your child signed up for a new account on Peblio with the username:\n'
        + `${user}\n`
        + 'If you would like to close your child’s account, please contact us:\n'
        + 'https://demo.peblio.co/pebl/yWzLLSWLM  \n'
        + 'Peblio is an instructional tool that makes it easy for anyone to learn or teach computer programming in any language and share their work with our community. Learn more at Peblio.co. \n'
        + 'Thank you for being a part of the Peblio community! \n'
        + 'The Peblio Team \n\n '
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