import { useTranslation } from 'react-i18next';

import './Footer.scss';

export const Footer: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <footer className='footer'>
      <p>{t('footer.madeWithLove')}</p>
    </footer>
  );
};
