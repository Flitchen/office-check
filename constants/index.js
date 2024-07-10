// Function for sending sms to admin

// import axios from "axios";
// import * as https from "https";
// const axios = require("axios");
// const https = require("https");
// var btoa = require("btoa");

// const api_key = "ca35eba793ff467c";
// const secret_key =
//   "M2JjNTIwNzU4ZWIzNmY0MTUzMjk1ZGU0Nzk3NjUyNzQyMzNlY2EzZDMxYzFhYWI1OGIwZDlkMzBlNDE0ODc5OA==";
// const content_type = "application/json";
// const source_addr = "INFO";

// export const sendSMS = (username) => {
//   axios
//     .post(
//       "https://apisms.beem.africa/v1/send",
//       {
//         source_addr: source_addr,
//         schedule_time: "",
//         encoding: 0,
//         message: `${username} is not in the office`,
//         recipients: [
//           {
//             recipient_id: 1,
//             dest_addr: "255624667758",
//           },
//           // {
//           //   recipient_id: 2,
//           //   dest_addr: "255700000002",
//           // },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": content_type,
//           Authorization: "Basic " + btoa(api_key + ":" + secret_key),
//         },
//         httpsAgent: new https.Agent({
//           rejectUnauthorized: false,
//         }),
//       }
//     )
//     .then((response) => console.log(response, api_key + ":" + secret_key))
//     .catch((error) => console.error(error.response.data));
// };

export const dummyEmployees = [
  {
    email: "magreth@gmail.com",
    firstName: "Magreth",
    lastName: "Steven",
    phone: "0742164660",
    uid: "AwreJwSv7EeX4AFohmyIQI8Hutw1",
    gender: "female",
    role: "admin",
  },
  {
    email: "augue@protonmail.org",
    firstName: "Kiona",
    lastName: "Robert",
    phone: "1-179-631-1771",
    uid: 2,
    gender: "female",
    role: "staff",
  },
  {
    email: "duis@aol.org",
    firstName: "Macaulay",
    lastName: "Ursula",
    phone: "557-0096",
    uid: 8,
    gender: "female",
    role: "staff",
  },
  {
    email: "et.ultrices@aol.edu",
    firstName: "Macaulay",
    lastName: "Damian",
    phone: "534-0763",
    uid: 47,
    gender: "male",
    role: "admin",
  },
  {
    email: "in@hotmail.couk",
    firstName: "Cedric",
    lastName: "Richard",
    phone: "1-566-591-2157",
    uid: 5,
    gender: "male",
    role: "staff",
  },
  {
    email: "nec.urna@aol.couk",
    firstName: "Martina",
    lastName: "Norman",
    phone: "1-525-813-8588",
    uid: 23,
    gender: "female",
    role: "staff",
  },
];
