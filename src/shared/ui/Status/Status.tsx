import cn from 'classnames';

import './Status.scss';

const STATUS_COLORS = {
  alive: 'green',
  dead: 'red',
  unknown: 'orange'
};

export type StatusesType = keyof typeof STATUS_COLORS;

export interface StatusProps {
  status?: StatusesType;
}

export const StatusCircle = (props: StatusProps) => {
  const { status = 'unknown' } = props;
  const statusValue = STATUS_COLORS[status];

  return statusValue ? (
    <div className={cn('circle', `circle_${statusValue}`)} />
  ) : null;
};
