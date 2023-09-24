const translateHandler = async () => {
  const textArea = document.getElementById("text-input");
  const localeArea = document.getElementById("locale-select");
  const errorArea = document.getElementById("error-msg");
  const translatedArea = document.getElementById("translated-sentence");

  const stuff = { text: textArea.value, locale: localeArea.value };
  errorArea.innerText = "";
  translatedArea.innerText = "";

  const data = await fetch("/api/translate", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(stuff),
  });

  const parsed = await data.json();
  if (parsed.error) {
    errorArea.innerText = JSON.stringify(parsed);
    return;
  }

  let translation = parsed.translation;
  //Wrap translated words with span tag
  if (translation != "Everything looks good to me!") {
    for (let word of parsed.translatedPhrases) {
      let regexWord = new RegExp(word, "g");
      translation = translation.replace(
        regexWord,
        `<span class="highlight">` + word + "</span>"
      );
    }
  } else {
    translation = parsed.translation;
  }

  translatedArea.innerHTML = translation;
  return;
};

document
  .getElementById("translate-btn")
  .addEventListener("click", translateHandler);
