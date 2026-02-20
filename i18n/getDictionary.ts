import { Locale } from "./config";

export async function getDictionary(locale: Locale) {

  switch (locale) {

    case "pt":
      return (await import("./dictionaries/pt")).default;

    case "en":
    default:
      return (await import("./dictionaries/en")).default;

  }

}