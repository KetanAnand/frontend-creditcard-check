/**
 * Created by ketan on 04/02/2017.
 */
const mastercard = {description:"Mastercard", length:16, iin_range_array:[[51,55],[2221,2720]]};
const amex = {description:"American Express", length:15, iin_array:[34,37]};
const visa = {description:"Visa", length_array:[13,16,19], iin:4};
const unknown = {description:"Unknown"};

var satisfiesLuhnAlgo = function (inputCardNumber) {
    var len = inputCardNumber.length;
    var parity = len % 2;
    var sum = 0;
    for (var i = len-1; i >= 0; i--) {
        var d = parseInt(inputCardNumber.charAt(i));
        if (i % 2 == parity) { d *= 2; }
        if (d > 9) { d -= 9; }
        sum += d;
    }
    return (sum % 10) === 0;
}

var passesBasicValidation = function (inputCardNumber) {
    if (inputCardNumber === "") throw "is empty";
    if (isNaN(inputCardNumber)) throw "not a number";
    return true;
};

var getCardType = function (inputCardNumber,mastercard,amex,visa,unknown ){
    var validateMastercardIin =  function (inputCardNumber) {
        return (parseInt(inputCardNumber.substr(0,2)) >= mastercard.iin_range_array[0][0] &&
            parseInt(inputCardNumber.substr(0,2)) <= mastercard.iin_range_array[0][1]) ||
            (parseInt(inputCardNumber.substr(0,4)) >= mastercard.iin_range_array[1][0] &&
            parseInt(inputCardNumber.substr(0,4)) <= mastercard.iin_range_array[1][1])
    }

    if (amex.iin_array.indexOf(parseInt(inputCardNumber.substr(0,2))) >=0
        && inputCardNumber.length ===amex.length){
        return amex.description;
    }
    else if (inputCardNumber.startsWith(visa.iin) && (visa.length_array.indexOf(inputCardNumber.length)>=0)){
        return visa.description;
    }
    else if (inputCardNumber.length ===mastercard.length && validateMastercardIin(inputCardNumber)){
        return mastercard.description;
    }
    else {
        return unknown.description;
    }
}

function validateCardNumber(inputCardNumber) {
    if ( passesBasicValidation(inputCardNumber) && satisfiesLuhnAlgo(inputCardNumber)){
        return JSON.stringify({"cardType":getCardType(inputCardNumber,mastercard,amex,visa,unknown),
            "isValid":true});
    }
    return JSON.stringify({"isValid":false});
}