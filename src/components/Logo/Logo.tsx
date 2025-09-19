import './Logo.css';

export const Logo: React.FunctionComponent = () => {
  return (
    <div>
      <img
        className='logo-rm'
        src='/src/assets/images/rick&morty.png'
        alt='logo'
      />
    </div>
  );
};
