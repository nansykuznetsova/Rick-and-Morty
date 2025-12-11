import { LogoImage } from '@/shared/assets';

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
