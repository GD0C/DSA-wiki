import { FC } from 'react';
import { BaseCard } from '../base/';
import { SharedType } from '../shared/types';

type AccordionProps = {
  title: string;
} & SharedType;

interface AccordionCardProps {
  data: AccordionProps[];
}

export const AccordionCard: FC<AccordionCardProps> = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <BaseCard>
          <details key={index} className="">
            <summary className="hover:cursor-pointer">{item.title}</summary>
            {item.children}
          </details>
        </BaseCard>
      ))}
    </>
  );
}

