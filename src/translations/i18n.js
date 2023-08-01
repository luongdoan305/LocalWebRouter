import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { Select } from 'antd'

 
import { TRANSLATIONS_VN } from "./vn/translations";
import { TRANSLATIONS_EN } from "./en/translations";
 
i18n
 .use(LanguageDetector)
 .use(initReactI18next)
 .init({
   resources: {
     en: {
       translation: TRANSLATIONS_EN
     },
     vn: {
       translation: TRANSLATIONS_VN
     }
   },
   fallbackLng: 'en',
 });

 export const LocaleSwitch = () => {
  const {locale} = 'en'

  const onChange = (value) => {
    i18n.changeLanguage(value);
  }
  const locales = [
    {value: 'en', label: '🇺🇸'},
    {value: 'vn', label: '🇻🇳'}
  ]
  return <Select options={locales} value={locale} defaultValue="en" onChange={onChange}/>
}
