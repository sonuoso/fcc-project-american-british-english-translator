const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");

let translator = new Translator();
let translation;

function unwrapSpanTag(translation) {
  if (/(<span class="highlight">|<\/span>)/.test(translation)) {
    translation = translation.replace(
      /(<span class="highlight">|<\/span>)/g,
      ""
    );
  }
  return translation;
}

suite("Unit Tests", () => {
  //#1
  test("Translate Mangoes are my favorite fruit. to British English", function () {
    translation = translator.translate(
      "Mangoes are my favorite fruit.",
      "american-to-british"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(translation.translation, "Mangoes are my favourite fruit.");
  });

  //#2
  test("Translate I ate yogurt for breakfast. to British English", function () {
    translation = translator.translate(
      "I ate yogurt for breakfast.",
      "american-to-british"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(translation.translation, "I ate yoghurt for breakfast.");
  });

  //#3
  test("Translate We had a party at my friend's condo. to British English", function () {
    translation = translator.translate(
      "We had a party at my friend's condo.",
      "american-to-british"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(
      translation.translation,
      "We had a party at my friend's flat."
    );
  });

  //#4
  test("Translate Can you toss this in the trashcan for me? to British English", function () {
    translation = translator.translate(
      "Can you toss this in the trashcan for me?",
      "american-to-british"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(
      translation.translation,
      "Can you toss this in the bin for me?"
    );
  });

  //#5
  test("Translate The parking lot was full. to British English", function () {
    translation = translator.translate(
      "The parking lot was full.",
      "american-to-british"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(translation.translation, "The car park was full.");
  });

  //#6
  test("Translate Like a high tech Rube Goldberg machine. to British English", function () {
    translation = translator.translate(
      "Like a high tech Rube Goldberg machine.",
      "american-to-british"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(
      translation.translation,
      "Like a high tech Heath Robinson device."
    );
  });

  //#7
  test("Translate To play hooky means to skip class or work. to British English", function () {
    translation = translator.translate(
      "To play hooky means to skip class or work.",
      "american-to-british"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(
      translation.translation,
      "To bunk off means to skip class or work."
    );
  });

  //#8
  test("Translate No Mr. Bond, I expect you to die. to British English", function () {
    translation = translator.translate(
      "No Mr. Bond, I expect you to die.",
      "american-to-british"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(translation.translation, "No Mr Bond, I expect you to die.");
  });

  //#9
  test("Translate Dr. Grosh will see you now. to British English", function () {
    translation = translator.translate(
      "Dr. Grosh will see you now.",
      "american-to-british"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(translation.translation, "Dr Grosh will see you now.");
  });

  //#10
  test("Translate Lunch is at 12:15 today. to British English", function () {
    translation = translator.translate(
      "Lunch is at 12:15 today.",
      "american-to-british"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(translation.translation, "Lunch is at 12.15 today.");
  });

  //#11
  test("Translate We watched the footie match for a while. to American English", function () {
    translation = translator.translate(
      "We watched the footie match for a while.",
      "british-to-american"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(
      translation.translation,
      "We watched the soccer match for a while."
    );
  });

  //#12
  test("Translate Paracetamol takes up to an hour to work. to American English", function () {
    translation = translator.translate(
      "Paracetamol takes up to an hour to work.",
      "british-to-american"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(
      translation.translation,
      "Tylenol takes up to an hour to work."
    );
  });

  //#13
  test("Translate First, caramelise the onions. to American English", function () {
    translation = translator.translate(
      "First, caramelise the onions.",
      "british-to-american"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(translation.translation, "First, caramelize the onions.");
  });

  //#14
  test("Translate I spent the bank holiday at the funfair. to American English", function () {
    translation = translator.translate(
      "I spent the bank holiday at the funfair.",
      "british-to-american"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(
      translation.translation,
      "I spent the public holiday at the carnival."
    );
  });

  //#15
  test("Translate I had a bicky then went to the chippy. to American English", function () {
    translation = translator.translate(
      "I had a bicky then went to the chippy.",
      "british-to-american"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(
      translation.translation,
      "I had a cookie then went to the fish-and-chip shop."
    );
  });

  //#16
  test("Translate I've just got bits and bobs in my bum bag. to American English", function () {
    translation = translator.translate(
      "I've just got bits and bobs in my bum bag.",
      "british-to-american"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(
      translation.translation,
      "I've just got odds and ends in my fanny pack."
    );
  });

  //#17
  test("Translate The car boot sale at Boxted Airfield was called off. to American English", function () {
    translation = translator.translate(
      "The car boot sale at Boxted Airfield was called off.",
      "british-to-american"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(
      translation.translation,
      "The swap meet at Boxted Airfield was called off."
    );
  });

  //#18
  test("Translate Have you met Mrs Kalyani? to American English", function () {
    translation = translator.translate(
      "Have you met Mrs Kalyani?",
      "british-to-american"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(translation.translation, "Have you met Mrs. Kalyani?");
  });

  //#19
  test("Translate Prof Joyner of King's College, London. to American English", function () {
    translation = translator.translate(
      "Prof Joyner of King's College, London.",
      "british-to-american"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(
      translation.translation,
      "Prof. Joyner of King's College, London."
    );
  });
  //#20
  test("Translate Tea time is usually around 4 or 4.30. to American English", function () {
    translation = translator.translate(
      "Tea time is usually around 4 or 4.30.",
      "british-to-american"
    );
    translation.translation = unwrapSpanTag(translation.translation);
    assert.equal(
      translation.translation,
      "Tea time is usually around 4 or 4:30."
    );
  });

  //#21
  test("Highlight translation in Mangoes are my favorite fruit.", function () {
    translation = translator.translate(
      "Mangoes are my favorite fruit.",
      "american-to-british"
    );
    assert.isTrue(
      /(<span class="highlight">|<\/span>)/.test(translation.translation)
    );
  });

  //#22
  test("Highlight translation in I ate yogurt for breakfast.", function () {
    translation = translator.translate(
      "I ate yogurt for breakfast.",
      "american-to-british"
    );
    assert.isTrue(
      /(<span class="highlight">|<\/span>)/.test(translation.translation)
    );
  });

  //#23
  test("Highlight translation in We watched the footie match for a while.", function () {
    translation = translator.translate(
      "We watched the footie match for a while.",
      "british-to-american"
    );
    assert.isTrue(
      /(<span class="highlight">|<\/span>)/.test(translation.translation)
    );
  });

  //#24
  test("Highlight translation in Paracetamol takes up to an hour to work.", function () {
    translation = translator.translate(
      "Paracetamol takes up to an hour to work.",
      "british-to-american"
    );
    assert.isTrue(
      /(<span class="highlight">|<\/span>)/.test(translation.translation)
    );
  });
});
