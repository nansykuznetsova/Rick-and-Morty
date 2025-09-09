import React from "react";
import cn from "classnames";

import "./Status.css";

interface CircleProps {
  color: string;
}

export const StatusCircle: React.FC<CircleProps> = ({ color }) => {
  return <span className={cn("circle", color)} />;
};
