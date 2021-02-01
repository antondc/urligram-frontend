import React from 'react';

import ListRow from 'Components/ListRow';
import { ListRowSkeletonGroup } from 'Components/ListRow/ListSkeletonGroup';
import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import { ListState } from 'Modules/Lists/lists.types';
import { Border, Button, Flex, Hr } from '@antoniodcorrea/components';

import './ListsVisitor.less';

interface Props {
  listsIds: number[];
  loading: boolean;
  popularLists: ListState[];
}

export const ListsVisitor: React.FC<Props> = ({ listsIds, popularLists, loading }) => (
  <div className="ListsVisitor">
    <Flex horizontal="between" vertical="top">
      <Sidebar>{/*  */}</Sidebar>
      <Main>
        <Border grow>
          <MainHeader title="My lists" />
          {loading ? (
            <ListRowSkeletonGroup />
          ) : (
            listsIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <ListRow id={id} />
              </React.Fragment>
            ))
          )}
          <Hr spacer size="big" />
          <Flex horizontal="center">
            <Button text="Load more" />
          </Flex>
        </Border>
      </Main>
      <Sidebar>{/*  */}</Sidebar>
    </Flex>
  </div>
);
