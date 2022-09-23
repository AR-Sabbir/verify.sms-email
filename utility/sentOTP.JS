

const getOTP = () => {

    const pin = Math.floor(Math.random()*10000000);

    const code =  pin + "" ;
    
    let OTP = '';

    if( code.length > 4){

        OTP = code.slice(0,4)
    }

    return OTP;

}

// export


module.exports = getOTP


