import { Link } from 'react-router-dom';

import { Layout } from '@/shared';
import { NotFoundImage } from '@/shared/assets';

import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <Layout>
      <div className='not-found__wrapper'>
        <div className='not-found'>
          <img
            src={NotFoundImage}
            alt='Page do not found'
            className='not-found__image'
          />
          <Link
            to='/'
            className='not-found__link'
            aria-label='back to menu'
          >
            Go to main page
          </Link>
        </div>
      </div>
    </Layout>
  );
};
