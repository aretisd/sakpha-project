const nodemailer = require('nodemailer');
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: gmailEmail,
        pass: gmailPassword
        // 1755945
    }
});

exports.sendWelcomEmail = functions.auth.user().onCreate((user) => {
    const email = user.email;
    const displayName = user.displayName;

    return sendWelcomEmail(email, displayName);
});

// module.exports = function sendEmail(to, subject, message) {
//     const mailOptions = {
//         from: 'noby8229@gmail.com',
//         to,
//         subject,
//         html: message
//     }
//     transporter.sendMail(mailOptions, function (err, info) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(info);
//         }
//     })
// }

// function test(){

//     alert('TestingFunction')
//     var nodemailer = require('nodemailer');
// var transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         user: 'noby8229@gmail.com',
//         pass: 'aretisd8139'
//         // 1755945
//     }
// });
//     const mailOptions = {
//     from: 'noby8229@gmail.com',
//     to: 'sakpha.thailand@gmail.com',
//     subject: 'Hellow',
//     html: '<p>Your html here</p>'
// }

// transporter.sendMail(mailOptions, function (err, info){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(info)
//     }
// })
// }

// const mailOptions = {
//     from: 'noby8229@gmail.com',
//     to: 'seaweed44.01@gmail.com',
//     subject: 'Hellow',
//     html: '<p>Your html here</p>'
// }

// transporter.sendMail(mailOptions, function (err, info){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(info)
//     }
// })

// const functions = require('firebase-functions');

// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
// const cors = require('cors')({ origin: true });

// // const SENDGRID_API_KEY = functions.config().sendgrid.key


// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('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');


// exports.httpEmail = functions.https.onRequest((req, res) => {

//     cors( req, res, () => { 

//         const toName  = req.body.toName;
//         const toEmail = req.body.toEmail;

//         const msg = {
//             to: toEmail,
//             from: 'sakpha.thailand@gmail.com',
//             subject:  'New Follower',
//             // text: `Hey ${toName}. You have a new follower!!! `,
//             html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,

//             // custom templates
//             // templateId: '300e1045-5b30-4f15-8c43-41754b73fe4f',
//             // substitutionWrappers: ['{{', '}}'],
//             // substitutions: {
//             //   name: toName
//             //   // and other custom properties here
//             // }
//         };

//         return sgMail.send(msg)
                
//             .then(() => res.status(200).send('email sent!') )
//             .catch(err => res.status(400).send(err) )

//         });

// });



// // exports.firestoreEmail = functions.firestore
// //     .document('users/{userId}/followers/{followerId}')
// //     .onCreate(event => {

// //         const userId = event.params.userId;

// //         const db = admin.firestore()

// //         return db.collection('users').doc(userId)
// //                  .get()
// //                  .then(doc => {

// //                     const user = doc.data()

// //                     const msg = {
// //                         to: user.email,
// //                         from: 'hello@angularfirebase.com',
// //                         subject:  'New Follower',
// //                         // text: `Hey ${toName}. You have a new follower!!! `,
// //                         // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
            
// //                         // custom templates
// //                         templateId: '300e1045-5b30-4f15-8c43-41754b73fe4f',
// //                         substitutionWrappers: ['{{', '}}'],
// //                         substitutions: {
// //                           name: user.displayName
// //                           // and other custom properties here
// //                         }
// //                     };

// //                     return sgMail.send(msg)
// //                 })
// //                 .then(() => console.log('email sent!') )
// //                 .catch(err => console.log(err) )
                     

// // });