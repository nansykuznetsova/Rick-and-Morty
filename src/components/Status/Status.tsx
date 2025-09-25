import cn from 'classnames';

import './Status.css';

const STATUS_COLORS = {
  alive: 'green',
  dead: 'red',
  unknown: 'orange'
} as const;

export type StatusesType = keyof typeof STATUS_COLORS;

export interface StatusProps {
  status?: StatusesType;
}

export const StatusCircle = (props: StatusProps) => {
  const { status = 'Unknown' } = props;
  const key = status.toLowerCase() as StatusesType;
  const statusValue = STATUS_COLORS[key];

  return statusValue ? <div className={cn('circle', statusValue)} /> : null;
};
