import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Layout } from '@/shared';
import { NotFoundImage } from '@/shared/assets';

import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className='not-found__wrapper'>
        <div className='not-found'>
          <img
            src={NotFoundImage}
            alt={t('errors.oops')}
            className='not-found__image'
          />
          <Link
            to='/'
            className='not-found__link'
            aria-label={t('aria.backToMenu')}
          >
            {t('actions.goToMainPage')}
          </Link>
        </div>
      </div>
    </Layout>
  );
};
