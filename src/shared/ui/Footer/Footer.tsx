import { useTranslation } from 'react-i18next';

import './Footer.scss';

export const Footer: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <footer className='footer'>
      <span>{t('footer.madeWithLove')}</span>
      <span>{t('footer.madeBy')}</span>
    </footer>
  );
};
