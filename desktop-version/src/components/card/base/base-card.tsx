import { FC } from 'react';
import { SharedType } from '../shared/types';

type BaseCardProps = SharedType;
const stringExists = (str: string) => str.length > 0;


export const BaseCard: FC<BaseCardProps> = ({ type = '', children }) => {
  const class_styles = `p-5 bg-brand w-full rounded-md`;

  return (
    <div className={stringExists(type) ? type : class_styles}>
      {children}
    </div>
  );
}
