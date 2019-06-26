import uuid from "uuid";
import AWS from "aws-sdk";

export function binToDec(binary) {

    var wordValue = 0;
    var place = 0;
    for (var n = binary.length - 1; n >= 0; n --) {
        var digit = binary[n];
        if (digit === "1") {
            wordValue += Math.pow(2, place);
        }
        place++;
    }

    console.log(binary + " : " + wordValue);

    return wordValue;
}

export function decToBin(decimal) {
    var binary = [];
    var quotient = decimal;
    while (quotient > 0) {
        var digit = quotient % 2;
        binary.push(digit);
        if (quotient == 1) {break;}
        quotient = Math.floor(quotient/2);
    }
    binary.reverse();
    var bstring = binary.join("");
    console.log(decimal + " : " + bstring);
    return bstring;
}

export function toEnglish(event, context, callback) {
    var words = JSON.parse(event.body).split(" ");
    //console.log(words);
    var translated = [];

    for (var i = 0; i < words.length; i++) {
        var wordValue = binToDec(words[i]);
        translated.push(String.fromCharCode(wordValue));
    }

    const response = {
        StatusCode: 200,
        body: translated.join()
    }

    callback(null, response);
}

export function toBinary(event, context, callback) {
    var message = JSON.parse(event.body)
    var translated = [];

    for (var i = 0; i < message.length; i++) {
        translated.push(decToBin(message.charCodeAt(i)));
    }

    const response = {
        StatusCode: 200,
        body: translated.join(" ")
    }

    callback(null, response);
}