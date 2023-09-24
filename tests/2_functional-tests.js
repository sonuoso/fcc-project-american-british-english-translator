const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  //#1
  test("Translation with text and locale fields: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "american-to-british",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "translation");
        assert.property(res.body, "translatedPhrases");
        assert.typeOf(res.body.translatedPhrases, "array");
        assert.equal(res.body.translation, "Mangoes are my favourite fruit.");
        done();
      });
  });

  //#2
  test("Translation with text and invalid locale field: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "First, caramelise the onions.",
        locale: "american-to-britis",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Invalid value for locale field");
        done();
      });
  });

  //#3
  test("Translation with missing text field: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({ text: null, locale: "american-to-british" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      });
  });

  //#4
  test("Translation with missing locale field: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({ text: "We watched the footie match for a while.", locale: null })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      });
  });

  //#5
  test("Translation with empty text: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({ text: "", locale: "american-to-british" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "No text to translate");
        done();
      });
  });

  //#6
  test("Translation with text that needs no translation: POST request to /api/translate", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "The car boot sale at Boxted Airfield was called off.",
        locale: "american-to-british",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "translation");
        assert.equal(res.body.translation, "Everything looks good to me!");
        done();
      });
  });
});
