import { FC } from 'react';
import { CardType, GridSize, SharedType } from '../shared/types';

/**
  * Author: { @Override } - 20260802 : @1656
**/


const SURFACE = 'p-5 bg-brand rounded-lg';

const COLS: Record<GridSize, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
} as const;;

const STYLE: Record<CardType, (size: GridSize) => string> = {
  standard: () => `${SURFACE} w-full rounded-md gap-8`,
  accordion: () => `${SURFACE} flex flex-col gap-8`,
  accordion_row: (size) => `${SURFACE} grid gap-8 ${COLS[size]}`,
  image: () => `${SURFACE} flex flex-col gap-8`,
};


export const BaseCard: FC<SharedType> = ({ type = 'standard', children, size = 1 }) => <div className={STYLE[type](size)}>{children}</div>
