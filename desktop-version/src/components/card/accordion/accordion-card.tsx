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
      <BaseCard>
        {data.map((item, index) => (
          <details key={index}>
            <summary>{item.title}</summary>
            {item.children}
          </details>
        ))}
      </BaseCard>
    </>
  );
}

