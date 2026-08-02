import { FC } from 'react';
import { BaseCard } from '../base/';
import { GridSize, SharedType } from '../shared/types';

type AccordionProps = {
  title: string;
} & SharedType;

interface AccordionCardProps {
  data: AccordionProps[];
}

export const AccordionCard: FC<AccordionCardProps> = ({ data }) => {
  const size_logic = Math.min(data.length, 4) as GridSize;

  return (
    <>
      <BaseCard type="accordion_row" size={size_logic}>
        {data.map((item, index) => (
          <details key={index} className="">
            <summary className="hover:cursor-pointer">{item.title}</summary>
            {item.children}
          </details>
        ))}
      </BaseCard>
    </>
  );
}

