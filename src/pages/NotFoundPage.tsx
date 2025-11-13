import { Link } from 'react-router-dom';

import ArrowBack from '@/assets/icons/arrow-back.svg?react';
import { Layout } from '@/components';

import './CharacterDetails.css';

import NotFoundImage from '/src/assets/images/404.jpg';

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
