## [Mor Bargig SMS Services](https://sms-services.herokuapp.com/)

[![Demo CountPages alpha](https://media.giphy.com/media/MaxtROcFIMsz2DOG4e/giphy.gif)](https://sms-services.herokuapp.com/)


web site for my needs, so I can send to customers SMS with details and links to parties for my work in the night life.

want to use this website ? open cmd and run `git clone https://github.com/morbargig/SMS-Services.git ` to install the product 

after you need to install all the libraries, run `npm install`

run `npm start` to run the app

run `node server.js` to run the server

you need to fill this fields with your Nexmo account details 
```javascript
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: '??',
    apiSecret: '???',
});
```

and don't forget to send the remove link 🔗 if you need to :)

## Goals :    
- 09/03/2020
    - [X] Facebook Login
    - [X] firebase database 
    - [X] remove links 🔗 
    - [ ] sms services 
    - [ ] Design 
    - [ ] Credit card payment

### Remove Page

![alt text](./photos/remove.png)

    
    
    




