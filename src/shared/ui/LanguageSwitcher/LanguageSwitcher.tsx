import { useTranslation } from 'react-i18next';

import { EnIcon, RuIcon } from '@/shared/assets';

import './LanguageSwitcher.scss';

export const LanguageSwitcher: React.FunctionComponent = () => {
  const { i18n, t } = useTranslation();
  const isRussian = i18n.resolvedLanguage === 'ru';
  const nextLanguage = isRussian ? 'en' : 'ru';
  const iconLabel = isRussian
    ? t('language.switchToEnglish')
    : t('language.switchToRussian');

  return (
    <button
      className='language-switcher'
      type='button'
      aria-label={iconLabel}
      onClick={() => i18n.changeLanguage(nextLanguage)}
    >
      {isRussian ? <EnIcon /> : <RuIcon />}
    </button>
  );
};
