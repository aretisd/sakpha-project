
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sakpha.thailand@gmail.com',
    pass: '17559745',
  },
});

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Sakpha Thailand';



exports.OrderUpdateTrigger = functions.database.ref('/OrderDetail/{year}/{month}/{day}/{pushId}/status')
      .onWrite((change, context) => {

           // Grab the current value of what was written to the Realtime Database.
           const original = change.after.val();
           const A = change.after.ref.parent;
           const temp = '';

        if (change.before.exists()) {
       
          if(original === 'Ready' || original === 'ready')
          {
          const email = A.child('email').once('value').then(function(snapshot){
            const orderID = A.key;
            const targetEmail = snapshot.val();

            const price = A.child('price').once('value').then(function(snapshot){
              //console.log('PRICE : ',snapshot.val());
              const totalPrice = snapshot.val();

              const remark = A.child('remark').once('value').then(function(snapshot){
                //console.log('PRICE : ',snapshot.val());
                const remark = snapshot.val();
              
              const detail = A.child('detail').once('value').then(function(snapshot){
                //console.log(': DETAIL : ');
                var detailNameArray = [];
                var detailCountArray = [];

                snapshot.forEach(function(childSnapshot){
                   //detailNameArray.push(childSnapshot.key);
                  //detailCountArray.push(childSnapshot.val());
                  childSnapshot.forEach(function(shot){
                    detailNameArray.push(shot.key);
                    detailCountArray.push(shot.val());
                    console.log("shot key : "+shot.key);
                    console.log("shot val : "+shot.val());
                  });
                });

                    
                   console.log('!! READY Trigger on orderID : ', orderID);
                  // waits(20000);
                   
                   return sendAlertEmail(targetEmail, orderID, totalPrice, detailNameArray, detailCountArray, remark);
                   //return sendWelcomeEmail(email,orderID);
                });
                });
              });
            });
          }
          // console.log('EMAIL : ', val);
          // console.log('ORG : ', original);

          return null
        }

        // Exit when the data is deleted.
        if (!change.after.exists()) {
          return null;
        }
   
        const uppercase = original.toUpperCase();
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        // return change.after.ref.parent.child('uppercase').set(uppercase);
        return null;
      });

// Counting Functions
exports.countingOrders = functions.database.ref('/OrderDetail/{year}/{month}/{day}/{orderID}')
.onCreate((snapshot, context) => {

    const dailyRef = snapshot.ref.parent;
    const monthRef = snapshot.ref.parent.parent;

    const dailyCount = dailyRef.child('dailyCount').once('value').then(function(snapshot){
      const prevCount = snapshot.val();
      // console.log('SNAPSHOT : ',prevCount);
      // temp = snapshot.val();
      // console.log('TEMP IN : ', temp);
      dailyRef.child('dailyCount').set(prevCount+1);
      console.log(prevCount+1,' - Orders TODAY.')
    });

    const monthCount = monthRef.child('monthCount').once('value').then(function(snapshot){
      const prevCount = snapshot.val();
      
      monthRef.child('monthCount').set(prevCount+1);
      console.log(prevCount+1,' - Orders NOW on this month.')
    });

    console.log("An order ID : ",snapshot.key," is firstly ADDED.");

    return null
});


    // Sends a welcome email to the given user.
function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
      from: `${APP_NAME} <noreply@firebase.com>`,
      to: email
    };
  
    // The user subscribed to the newsletter.
    mailOptions.subject = `${APP_NAME}! - ORDER COMPLETE`;
    mailOptions.text = `รายการ ส่งซัก [${displayName || ''}] ของคุณเสร็จแล้ว สามารถมารับกลับได้ทันที ขอบคุณค่ะ - Your ORDER ID : [${displayName || ''}] is now ready to pick up !`;
    mailTransport.sendMail(mailOptions);
    console.log('!! Order READY - email sent to:', email);
    return null;
  }



// Sends ALERT - Notification Email to the given user.
function sendAlertEmail(email, orderID, price, detailNameArray, detailCountArray, remark) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };
  console.log(`!! Drafting ALERT - Email to ${email} ...`);
  // The user subscribed to the newsletter.
  mailOptions.subject = `${APP_NAME}! - ORDER COMPLETE`;
  mailOptions.html = `<h5> รายการ ส่งซัก [${orderID || ''}] ของคุณเสร็จแล้ว </h5> สามารถมารับกลับได้แล้วค่ะ ขอบคุณค่ะ <br><h5> Your ORDER ID : [${orderID || ''}]</h5> is now ready to pick up ! <br>`;
  mailOptions.html += `<h5> Price : ${price} THB<br>`;
  
  // console.log('Price : ',price);
  mailOptions.html += '<h6> Detail <h6>';
  for (i=0; i < detailNameArray.length; i++){
    // console.log(detailNameArray[i],' - ',detailCountArray[i]);
    mailOptions.html += ` - ${detailNameArray[i]} จำนวน ${detailCountArray[i]} ชิ้น <br>`;
  }
  
  mailOptions.html += '<h6 style="color:red;"> remark </h6> <br>';
  mailOptions.html += '<h8> '+remark+' </h8>'

  mailTransport.sendMail(mailOptions);
  console.log(`!! SENT notification - Email to ${email} !`);
  return null;
}


  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
