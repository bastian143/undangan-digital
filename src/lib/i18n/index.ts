import id from "./id.json";
import en from "./en.json";

type TranslationData = typeof id;

const translations: Record<string, TranslationData> = {
  id,
  en,
};

/**
 * Get translation object for a given language code.
 * Falls back to Indonesian if language not found.
 */
export function getTranslation(lang: string = "id"): TranslationData {
  return translations[lang] || translations.id;
}

/**
 * Get a specific translation value by dot-notation key.
 * Example: t("cover.dear", "id") => "Kepada Yth."
 */
export function t(key: string, lang: string = "id"): string {
  const translation = getTranslation(lang);
  const keys = key.split(".");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translation;
  for (const k of keys) {
    value = value?.[k];
  }

  return typeof value === "string" ? value : key;
}

export type { TranslationData };
export { translations };
