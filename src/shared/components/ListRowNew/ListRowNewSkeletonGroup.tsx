import React from 'react';

import { ListRowNewSkeleton } from 'Components/ListRowNew/ListRowNewSkeleton';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import CardItem from '../CardItem';

interface Props {
  length?: number;
}

export const ListRowNewSkeletonGroup: React.FC<Props> = ({ length }) => {
  const lengthNoZero = length > 0 ? length : DEFAULT_PAGE_SIZE;

  return (
    <>
      {Array.from({ length: lengthNoZero }, (_, index) => (
        <CardItem key={index}>
          <ListRowNewSkeleton id={index} />
        </CardItem>
      ))}
    </>
  );
};
