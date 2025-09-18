import { STATUS_OPTIONS } from "@/constants";

import { Layout } from "../components/Layout/Layout.tsx";
import { Logo } from "../components/Logo/Logo.tsx";
import { Loader } from "../components/Loader/Loader.tsx";
import { Select } from "../components/Select/Select.tsx";
import {
  StatusCircle,
  type StatusesType,
} from "@/components/Status/Status.tsx";

import { SelectorPanel } from "../widgets/SelectorPanel/SelectorPanel.tsx";

import "./CharacterList.css";

export const CharacterList: React.FunctionComponent = () => {
  return (
    <Layout>
      <div className="character-list">
        <Logo />
        <SelectorPanel />
        <Select
          variant="small"
          options={STATUS_OPTIONS}
          SelectOptionComponent={(props) => (
            <>
              {props.value}

              <StatusCircle status={props.value as StatusesType} />
            </>
          )}
        />
        <Loader text="Loading characters..." size="large" />
      </div>
    </Layout>
  );
};
