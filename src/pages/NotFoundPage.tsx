import { Link } from 'react-router-dom';

import { Layout } from '@/shared';
import ArrowBack from '@/shared/assets/icons/arrow-back.svg?react';
import NotFoundImage from '@/shared/assets/images/404.jpg';

import './CharacterDetails.css';

export const NotFoundPage = () => {
  return (
    <Layout>
      <div className='character-details'>
        <Link
          to='/'
          className='character-details__link'
          aria-label='back to menu'
        >
          <ArrowBack className='character-details__link-icon' />
          GO BACK
        </Link>
        <div className='not-found'>
          <img
            src={NotFoundImage}
            alt='Page do not found'
            className='not-found-image'
          />
        </div>
      </div>
    </Layout>
  );
};
