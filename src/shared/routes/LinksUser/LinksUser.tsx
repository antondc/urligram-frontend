import React from 'react';

import { LinkRowSkeletonGroup } from 'Components/LinkRow/LinkRowSkeletonGroup';
import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import { ListState } from 'Modules/Lists/lists.types';
import LinkRow from 'Root/src/shared/components/LinkRow';
import { Border, Button, Flex, Hr } from '@antoniodcorrea/components';

import './LinksUser.less';

interface Props {
  linksIds: number[];
  popularLists: ListState[];
  loading: boolean;
}

export const LinksUser: React.FC<Props> = ({ linksIds, popularLists, loading }) => (
  <div className="LinksUser">
    <Flex horizontal="between" vertical="top">
      <Sidebar>{/*  */}</Sidebar>
      <Main>
        <Border grow>
          <MainHeader title="My links" />
          {loading ? (
            <LinkRowSkeletonGroup />
          ) : (
            linksIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <LinkRow id={id} />
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
