

import Nexmo from 'nexmo';
const nexmo = new Nexmo({
    apiKey: '34d361c8',
    apiSecret: 'Hdhhdhd3777',
});

const opts = {
    "type": "unicode",
    "concat": 'true'
};

const sendMassege = function (from, to, text) {
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

