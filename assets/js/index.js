const sourceLangDropdown = document.querySelector("#sourceLangDropdown");
const targetLangDropdown = document.querySelector("#targetLangDropdown");
const sourceTextarea = document.querySelector("#sourceTextarea");
const targetTextarea = document.querySelector("#targetTextarea");
const translateTextBtn = document.querySelector("#translateTextBtn");

// Fetch language data using GET request
async function getData() {
  const url = "https://text-translator2.p.rapidapi.com/getLanguages";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "84ecaa6701mshf2901a18afe0bdep168de6jsn854cb4cfe763",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.data.languages;
    // console.log(result);
  } catch (error) {
    console.error(error);
  }
}

//  the function to populate language dropdowns
async function populateLanguageDropdowns() {
  const languages = await getData();

  if (languages) {
    languages.filter((lang) => {
      if (lang.name === "Armenian") {
        return;
      }
      let option = document.createElement("option");
      option.value = lang.code;
      option.text = lang.name;

      sourceLangDropdown.appendChild(option.cloneNode(true));
      targetLangDropdown.appendChild(option);
    });
  }
}
populateLanguageDropdowns();

// Fetch translation / POST request
async function translate(sourceLang, targetLang, textToTranslate) {
  const url = "https://text-translator2.p.rapidapi.com/translate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "84ecaa6701mshf2901a18afe0bdep168de6jsn854cb4cfe763",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: new URLSearchParams({
      source_language: sourceLang,
      target_language: targetLang,
      text: textToTranslate,
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    console.log(result); // Log the entire response for debugging

    if (
      result.status === "success" &&
      result.data &&
      result.data.translatedText
    ) {
      return result.data.translatedText;
    } else {
      return "there is no such expression in this language";
    }
  } catch (error) {
    console.error(error);
    return "Translation failed";
  }
}

// Event listener for the translate button
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

  // Display the translated text in the targetTextarea
  targetTextarea.value = translation;
}
