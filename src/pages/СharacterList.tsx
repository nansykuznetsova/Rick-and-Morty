// import { STATUS_OPTIONS } from "@/constants";

import { Layout } from '@/components/Layout/Layout';
import { Logo } from '@/components/Logo/Logo';
// import { Loader } from "@/components/Loader/Loader";
// import { Select } from "@/components/Select/Select";
// import { StatusCircle, type StatusesType } from "@/components/Status/Status";

import { SelectorPanel } from '@/widgets/SelectorPanel/SelectorPanel';

import './CharacterList.css';
import { Input } from '@/components/Input/Input.tsx';

export const CharacterList: React.FunctionComponent = () => {
  return (
    <Layout>
      <div className='character-list'>
        <Logo />
        <SelectorPanel />
        <Input
          variant='form'
          value='Rick Sanchez'
          name='search'
        />
        {/*<Select*/}
        {/*  variant="small"*/}
        {/*  options={STATUS_OPTIONS}*/}
        {/*  SelectOptionComponent={(props) => (*/}
        {/*    <>*/}
        {/*      {props.value}*/}

        {/*      <StatusCircle status={props.value as StatusesType} />*/}
        {/*    </>*/}
        {/*  )}*/}
        {/*/>*/}
        {/*<Loader text="Loading characters..." size="large" />*/}
      </div>
    </Layout>
  );
};
