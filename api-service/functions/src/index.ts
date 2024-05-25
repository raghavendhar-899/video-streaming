// /**
//  * Import function triggers from their respective submodules:
//  *
//  * import {onCall} from "firebase-functions/v2/https";
//  * import {onDocumentWritten} from "firebase-functions/v2/firestore";
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// // import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

// // export const helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });

// import {Firestore} from "firebase-admin/firestore";
// import {initializeApp} from "firebase-admin";
// import * as functions from "firebase-functions";
// // import * as admin from "firebase-admin";

// initializeApp();
// const firestore = new Firestore();

// export const createUser = functions.auth.user().onCreate((user) => {
//   const userData = {
//     uid: user.uid,
//     email: user.email,
//     displayName: user.displayName,
//     photoURL: user.photoURL,
//   };

//   firestore.collection("users").doc(user.uid).set(userData);
//   logger.info("User created", JSON.stringify(userData));
//   return functions.logger.log(userData);
// }
// );

import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";

initializeApp();

const firestore = new Firestore();

export const createUser = functions.auth.user().onCreate((user) => {
  const userInfo = {
    uid: user.uid,
    email: user.email,
    photoUrl: user.photoURL,
  };

  firestore.collection("users").doc(user.uid).set(userInfo);
  logger.info(`User Created: ${JSON.stringify(userInfo)}`);
  return;
});

