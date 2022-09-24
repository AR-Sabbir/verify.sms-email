const axios = require('axios')


//  sent sms massege


const sendMessage = async( to,mess ) => {



   await axios.get(`https://bulksmsbd.net/api/smsapi?api_key=Rh1YmxrPzX8rskkmMEzR&type=text&number=${to}&senderid=03590900025&message=${mess}`)

}


//  export


module.exports = sendMessage;