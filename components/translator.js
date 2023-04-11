const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    USToGB(text){
        let translated = ''
        const wordsArray = {...americanOnly, ...americanToBritishSpelling, ...americanToBritishTitles}
        translated = this.translate(text, wordsArray)
        translated = this.time(translated, "US")
        return translated
    }
    GBToUS(text){
        let translated = ''
        let GBtoUSTitles = this.swap(americanToBritishTitles)
        let GBtoUSSpelling = this.swap(americanToBritishSpelling)
        const wordsArray = {...britishOnly, ...GBtoUSSpelling, ...GBtoUSTitles}
        translated = this.translate(text, wordsArray)
        translated = this.time(translated, "GB")
        return translated
    }
    swap(json){
        var ret = {};
        for(var key in json){
          ret[json[key]] = key;
        }
        return ret;
    }
    time(text, lang){
        let regex
        let newDiv
        let newVal
        //let regex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g;
        if (lang=="GB"){
            regex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(\.)([0-5][0-9]))/g;
            newDiv = ['.', ':']
        }
        else if (lang=="US"){
            regex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:)([0-5][0-9]))/g;
            newDiv = [':', '.']
        }
        const changeTime = text.match(regex);
        if (changeTime){
            changeTime.forEach((value, i)=>{
                newVal = value.replace(newDiv[0], newDiv[1])
                console.log(newVal)
                text = text.replace(value, function (){
                    return '<span class="highlight">' + newVal + '</span>';
                })
            })
        }
        
        return text
    }
    translate(text, wordsArray){
        let regex
        for (const original in wordsArray) {
            regex = new RegExp(`${original}`, "gi");
            text = text.replace(regex, function (match){
                let newWord = wordsArray[original]
                
                if (match[0]===match[0].toUpperCase()){
                    newWord = newWord[0].toUpperCase() + newWord.slice(1)
                }
                return '<span class="highlight">' + newWord + '</span>';
            })
          }
        return text;
    }
}

module.exports = Translator;