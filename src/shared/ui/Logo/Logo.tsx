import LogoImage from '@/shared/assets/images/rick&morty.png';

import './Logo.css';

export const Logo: React.FunctionComponent = () => {
  return (
    <div>
      <img
        className='logo-rm'
        src={LogoImage}
        alt='logo'
      />
    </div>
  );
};
