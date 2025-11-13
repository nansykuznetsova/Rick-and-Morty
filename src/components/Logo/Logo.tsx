import './Logo.css';

import LogoImage from '/src/assets/images/rick&morty.png';

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
