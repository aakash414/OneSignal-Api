const request = require("request");
require("dotenv").config();
const API_KEY = process.env.onesignal_api_key;
const ONESIGNAL_APP_ID = "4a0b9443-7a29-4ab7-a200-f1d8dc0b43ff";
const BASE_URL = "https://onesignal.com/api/v1/";

/**
 * OPTIONS BUILDER
 * @param {string} method
 * @param {string} path
 * @param {object} body
 * @returns {object} options
 */
const optionsBuilder = (method, path, body) => {
  return {
    method,
    url: `${BASE_URL}/${path}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${API_KEY}`,
    },
    body: body ? JSON.stringify(body) : null,
  };
};

/**
 * CREATE A PUSH NOTIFICATION
 * method: POST
 * Postman: https://www.postman.com/onesignaldevs/workspace/onesignal-api/request/16845437-c4f3498f-fd80-4304-a6c1-a3234b923f2c
 * API Reference: https://documentation.onesignal.com/reference#create-notification
 * path: /notifications
 * @param {object} body
 */

const createNotication = (body) => {
  const options = optionsBuilder("POST", "notifications", body);
  console.log(options);
  request(options, (error, response) => {
    if (error) throw new Error(error);
    console.log(response.body);
    viewNotifcation(JSON.parse(response.body).id);
  });
};

/**
 * VIEW NOTIFICATION
 * method: GET
 * Postman: https://www.postman.com/onesignaldevs/workspace/onesignal-api/request/16845437-6c96ecf0-5882-4eac-a386-0d0cabc8ecd2
 * API Reference: https://documentation.onesignal.com/reference#view-notification
 * path: /notifications/{notification_id}?app_id=${ONE_SIGNAL_APP_ID}
 * @param {string} notificationId
 */
const viewNotifcation = (notificationId) => {
  const path = `notifications/${notificationId}?app_id=${ONESIGNAL_APP_ID}`;
  const options = optionsBuilder("GET", path);
  request(options, (error, response) => {
    if (error) throw new Error(error);
    console.log(response.body);
  });
};

/**
 * RUN THE NODE JS APP
 */
const body = {
  app_id: ONESIGNAL_APP_ID,
  include_player_ids: ["d0ac9022-802d-4c1a-b1d3-18573fc1b62b"],
  data: {
    foo: "bar",
  },
  contents: {
    en: "Sample Push Message",
  },
  headings: {
    en: "This is a Push Message",
  },
  subtitle: {
    en: "This is a subtitle",
  },
  url: "https://www.google.com",
  chrome_web_image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSMNlYlWwlydRehmsyge6h6fUPGXjtpuNMPA&usqp=CAU",
  chrome_web_icon:
    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  web_buttons: [
    {
      id: "button_id_1",
      text: "Interested",
      icon: "https://www.livelaw.in/h-upload/2023/07/07/1500x900_480120-thumbs-up-emoji.jpg",
    },
    {
      id: "button_id_2",
      text: "Not Interested",
      icon: "https://i.pinimg.com/474x/44/c0/19/44c0198c36c2fddc60d76390bcf47738.jpg",
    },
  ],
};

createNotication(body);
