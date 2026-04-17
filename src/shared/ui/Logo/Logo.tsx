import { useTranslation } from 'react-i18next';

import { LogoImage } from '@/shared/assets';

import './Logo.scss';

export const Logo: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <img
        className='logo-rm'
        src={LogoImage}
        alt={t('aria.logo')}
      />
    </div>
  );
};
