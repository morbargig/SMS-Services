

import Nexmo from 'nexmo';
// const Nexmo = require('nexmo'); 
const nexmo = new Nexmo({
    apiKey: '3121be19',
    apiSecret: 'Huaem8M9RJpHW6X7',
});

const opts = {
    "type": "unicode",
    "concat": 'true'
};

const sendMassege = function (from, to, text) {
    console.log(from, to, text)
    nexmo.message.sendSms(from, to, text, opts, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}


export default sendMassege


