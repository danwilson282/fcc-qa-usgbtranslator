'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let {text, locale} = req.body;
      let translated
      if (text==''){
        res.json({error: 'No text to translate'})
      }
      else if (!locale || !text){
        res.json({ error: 'Required field(s) missing' })
      }
      if (locale==="british-to-american"){
        //GB to US
        translated = translator.GBToUS(text)
        //res.json({text: text, translation: locale})
      }
      else if (locale==="american-to-british"){
        //US to GB
        translated = translator.USToGB(text)
        //res.json({text: text, translation: locale})
      }
      else {
        res.json({ error: 'Invalid value for locale field' })
      }
      if (translated===text){
        //if no changes...
        res.json({text: text, translation: "Everything looks good to me!"})
      }
      else{
        //return translated text
        res.json({text: text, translation: translated})
      }
    });
};
