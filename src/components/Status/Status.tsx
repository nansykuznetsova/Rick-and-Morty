import cn from 'classnames';

import './Status.css';

const STATUS_COLORS = {
  Alive: 'green',
  Dead: 'red',
  Unknown: 'orange',
  alive: 'green',
  dead: 'red',
  unknown: 'orange'
};

export type StatusesType = keyof typeof STATUS_COLORS;

export interface StatusProps {
  status?: StatusesType;
}

export const StatusCircle = (props: StatusProps) => {
  const { status = 'Unknown' } = props;
  const statusValue = STATUS_COLORS[status];

  return statusValue ? <div className={cn('circle', statusValue)} /> : null;
};
