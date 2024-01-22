const sourceLangDropdown = document.querySelector("#sourceLangDropdown");
const targetLangDropdown = document.querySelector("#targetLangDropdown");
const sourceTextarea = document.querySelector("#sourceTextarea");
const targetTextarea = document.querySelector("#targetTextarea");
const translateTextBtn = document.querySelector("#translateTextBtn");

//  event listener for the translate button
translateTextBtn.addEventListener("click", function () {
  translateText();
});

async function translateText() {
  const sourceLang = sourceLangDropdown.value;
  const targetLang = targetLangDropdown.value;
  const textToTranslate = sourceTextarea.value;

  if (!textToTranslate) {
    alert("Please enter text to translate.");
    return;
  }

  const translation = await translate(sourceLang, targetLang, textToTranslate);

  // display the translated text in the targetTextarea
  targetTextarea.value = translation;
}

// fetch translation
async function translate(sourceLang, targetLang, textToTranslate) {
  const url = "https://google-translate1.p.rapidapi.com/language/translate/v2";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "84ecaa6701mshf2901a18afe0bdep168de6jsn854cb4cfe763",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    body: new URLSearchParams({
      q: textToTranslate,
      target: targetLang,
      source: sourceLang,
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.data.translations[0].translatedText;
  } catch (error) {
    console.error(error);
  }
}

// language list
const langList = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "az", name: "Azerbaijani" },
  { code: "tr", name: "Turkish" },
  { code: "ru", name: "Russian" },
  { code: "zh", name: "Chinese" },
  { code: "it", name: "Italian" },
  { code: "es", name: "Spanish" },
  { code: "pt", name: "Portuguese" },
  { code: "hi", name: "Hindi" },
  { code: "uk", name: "Ukrainian" },
  { code: "uz", name: "Uzbek" },
  { code: "tg", name: "Tajik" },
  { code: "tk", name: "Turkmen" },
  { code: "ko", name: "Korean" },
];

// populate sourceLangDropdown and targetLangDropdown with language options
langList.forEach((lang) => {
  const option = document.createElement("option");
  option.value = lang.code;
  option.text = lang.name;

  sourceLangDropdown.appendChild(option.cloneNode(true));
  targetLangDropdown.appendChild(option);
});
