"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    let text = req.body.text;
    let locale = req.body.locale;
    let localeValues = ["american-to-british", "british-to-american"];

    if (text == null && locale == null) {
      res.send({ error: "Required field(s) missing" });
    } else {
      if (text && locale == null) {
        res.send({ error: "Required field(s) missing" });
      } else {
        if (text == null && locale) {
          res.send({ error: "Required field(s) missing" });
        } else {
          if (text == "" && locale) {
            res.send({ error: "No text to translate" });
          } else {
            if (text && localeValues.includes(locale) == false) {
              res.send({ error: "Invalid value for locale field" });
            } else {
              let result = translator.translate(text, locale);
              res.send({
                text: text,
                translation: result.translation,
                translatedPhrases: result.translatedPhrases,
              });
            }
          }
        }
      }
    }
  });
};
