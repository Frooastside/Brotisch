import deIcon from "../media/flags/de.svg";
import enIcon from "../media/flags/en.svg";
import fiIcon from "../media/flags/fi.svg";
import nlIcon from "../media/flags/nl.svg";

function fetchTranslations(word) {
  return fetch(
    new Request(
      `${process.env.REACT_APP_BACKEND}/api/words/translate/${word}`,
      {
        method: "POST",
        credentials: "include"
      }
    )
  )
    .then((response) => response.json())
    .then((translations) => translations)
    .catch(() => null);
}

function fetchDefinitions(word) {
  return fetch(
    new Request(
      `${process.env.REACT_APP_BACKEND}/api/words/definitions/${word}`,
      {
        method: "POST",
        credentials: "include"
      }
    )
  )
    .then((response) => response.json())
    .then((definitions) => definitions)
    .catch(() => null);
}

const iconOf = (language) => {
  return language === "en"
    ? enIcon
    : language === "de"
    ? deIcon
    : language === "nl"
    ? nlIcon
    : language === "fi"
    ? fiIcon
    : null;
};

export { fetchTranslations, fetchDefinitions, iconOf };
