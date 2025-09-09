import { Select } from "../../components/Select/Select.tsx";
import {
  SPECIES_OPTIONS,
  GENDER_OPTIONS,
  STATUS_OPTIONS,
} from "../../constants/options.ts";

import "./SelectorPanel.css";

export const SelectorPanel: React.FunctionComponent = () => {
  return (
    <div className="selector-panel">
      <Select placeholder="Species" options={SPECIES_OPTIONS} />
      <Select placeholder="Species" options={SPECIES_OPTIONS} />
      <Select placeholder="Gender" options={GENDER_OPTIONS} />
      <Select placeholder="Status" options={STATUS_OPTIONS} />
    </div>
  );
};
