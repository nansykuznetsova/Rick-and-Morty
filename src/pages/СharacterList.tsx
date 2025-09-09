import { Layout } from "../components/Layout/Layout.tsx";
import { Logo } from "../components/Logo/Logo.tsx";
// import { Loader } from "../components/Loader/Loader.tsx";
import { SelectorPanel } from "../widgets/SelectorPanel/SelectorPanel.tsx";

import "./CharacterList.css";
import { STATUS_OPTIONS } from "../constants/options.ts";
import { Select } from "../components/Select/Select.tsx";

export const CharacterList: React.FunctionComponent = () => {
  return (
    <Layout>
      <div className="character-list">
        <Logo />
        <SelectorPanel />
        <Select variant="small" placeholder="Status" options={STATUS_OPTIONS} />
        {/*<Loader text="Loading characters..." size="large" />*/}
      </div>
    </Layout>
  );
};
