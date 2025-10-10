import { Link } from 'react-router-dom';

import ArrowBack from '@/assets/icons/arrow-back.svg?react';
import { Layout, Loader } from '@/components';

import './CharacterDetails.css';

export const CharacterDetails: React.FunctionComponent = () => {
  return (
    <Layout>
      <div className='character-details'>
        <Link
          to='/'
          className='character-details__link'
          aria-label='назад в меню'
        >
          <ArrowBack className='character-details__link-icon' />
          GO BACK
        </Link>
        <Loader
          text='Loading character card...'
          size='large'
        />
      </div>
    </Layout>
  );
};
