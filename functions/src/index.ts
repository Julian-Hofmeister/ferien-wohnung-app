// Firebase Config
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
// const db = admin.firestore();

// Sendgrid Config
import * as sgMail from '@sendgrid/mail';

const API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(API_KEY);

// ----------------------------------------------------------------------------------------------

//Sends E-mail to Admin when user writes new Message
export const newMessage = functions.firestore
  .document('messages/{messageId}')
  .onCreate(async (change, context) => {
    // Raw Data
    const message = change.data();

    // Email
    const msg = {
      to: 'info@oberstdorf-ohrwumslar.de',
      from: message.email,
      templateId: 'd-64616893a5644e6aa4c79a9737be4987',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      dynamic_template_data: {
        email: message.email,
        message: message.message,
      },
    };

    // Send it
    return sgMail.send(msg);
  });

// ----------------------------------------------------------------------------------------------

//Sends E-mail to Admin when user orders Bread
export const newBreakfastOrder = functions.firestore
  .document('breakfast-orders/{breakfastOrderId}')
  .onCreate(async (change, context) => {
    // Raw Data
    const order = change.data();

    // Email
    const msg = {
      to: [order.senderEmail, 'info@oberstdorf-ohrwumslar.de'],
      from: order.email,
      templateId: 'd-c42980c050c34195abd26bf28dab1753',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      dynamic_template_data: {
        email: order.email,
        room: order.room,
        order: order.order,
        date: order.date,
      },
    };

    // Send it
    return sgMail.send(msg);
  });

// ----------------------------------------------------------------------------------------------

//Sends E-mail to Admin when user saves Starter kit
export const newStarterkit = functions.firestore
  .document('bevore-arrival/{starterId}')
  .onCreate(async (change, context) => {
    // Raw Data
    const starterkit = change.data();

    // Email
    const msg = {
      to: 'info@oberstdorf-ohrwumslar.de',
      from: starterkit.email,
      templateId: 'd-d60bd232d6d74912a0bf2f753b6abc7b',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      dynamic_template_data: {
        email: starterkit.email,
        room: starterkit.room,

        arriveDate: starterkit.arriveDate,
        leaveDate: starterkit.leaveDate,

        bikeAmount: starterkit.bikeAmount,
        starterMessage: starterkit.starterMessage,
      },
    };

    // Send it
    return sgMail.send(msg);
  });

// ----------------------------------------------------------------------------------------------

//Sends E-mail to User when Admin creates Account
export const newUser = functions.firestore
  .document('users/{userId}')
  .onCreate(async (change, context) => {
    // Raw Data
    const user = change.data();
    const id = change.id;

    // Email
    const msg = {
      to: user.email,
      from: 'info@oberstdorf-ohrwumslar.de',
      templateId: 'd-ec2e8042147747668947312633bbdd46',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      dynamic_template_data: {
        email: user.email,
        password: user.password,
      },
    };

    // Send it
    return sgMail.send(msg);
  });
