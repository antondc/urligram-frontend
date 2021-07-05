import React from 'react';

import { ListRowSkeleton } from 'Components/ListRow/ListRowSkeleton';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';

interface Props {
  length?: number;
}

export const ListRowSkeletonGroup: React.FC<Props> = ({ length }) => {
  const lengthNoZero = length > 0 ? length : DEFAULT_PAGE_SIZE;

  return (
    <>
      {Array.from({ length: lengthNoZero }, (_, index) => (
        <ListRowSkeleton id={index} key={index} />
      ))}
    </>
  );
};
