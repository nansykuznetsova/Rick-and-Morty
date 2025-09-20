import { Link } from 'react-router-dom';

import ArrowBack from '@/assets/icons/arrow-back.svg?react';
import { Layout } from '@/components/Layout/Layout';
import { Loader } from '@/components/Loader/Loader';

import './CharacterDetails.css';

export const CharacterDetails: React.FunctionComponent = () => {
  return (
    <Layout>
      <div className='character-details'>
        <Link
          to='/'
          className='go-back-character-details'
          aria-label='назад в меню'
        >
          <ArrowBack className='arrow-back' />
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
