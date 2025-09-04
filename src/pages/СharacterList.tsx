import { Layout } from "../components/Layout/Layout.tsx";
import { Logo } from "../components/Logo/Logo.tsx";
import { Loader } from "../components/Loader/Loader.tsx";

import "./CharacterList.css";

export const CharacterList: React.FunctionComponent = () => {
  return (
    <Layout>
      <div className="character-list">
        <Logo />
        <Loader text="Loading characters..." size="large" />
      </div>
    </Layout>
  );
};
