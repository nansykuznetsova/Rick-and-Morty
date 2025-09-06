import { Select } from "../../components/Select/Select.tsx";

import "./SelectorPanel.css";

export const SelectorPanel: React.FunctionComponent = () => {
  return (
    <div className="selector-panel">
      <Select />
      <Select />
      <Select />
      <Select />
    </div>
  );
};
