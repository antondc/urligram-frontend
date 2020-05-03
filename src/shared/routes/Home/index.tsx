import React from 'react';
import Flex from 'Ui/Flex';
import Hr from 'Ui/Hr';
import Button from 'Ui/Button';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarListUsers from 'Components/SidebarListUsers';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import LinkCard from 'Components/LinkCard';
import { lists } from 'Root/src/shared/tools/mockData/mockLists';
import { tags } from 'Root/src/shared/tools/mockData/mockTags';
import { users } from 'Root/src/shared/tools/mockData/mockUsers';
import { links } from 'Root/src/shared/tools/mockData/mockLinks';

import './Home.less';

const Home: React.FC = () => {
  return (
    <div className="Home">
      <Flex horizontal="between" vertical="top">
        <Sidebar>
          <SidebarListLists title="Popular Lists" items={lists} />
          <Hr type="spacer" />
          <SidebarListLists title="Popular Lists" items={lists} />
          <Hr type="spacer" />
          <SidebarListLists title="Popular Lists" items={lists} />
        </Sidebar>
        <Main>
          {links.map((item, index) => (
            <React.Fragment key={item.id}>
              {!!index && <Hr type="spacer" />}
              <LinkCard {...item} />
            </React.Fragment>
          ))}
          <Hr type="spacer" size="big" />
          <Flex horizontal="center">
            <Button text="Load more" />
          </Flex>
        </Main>
        <Sidebar>
          <SidebarListTags title="Trending Tags" items={tags} />
          <Hr type="spacer" />
          <SidebarListUsers title="Popular Users" items={users} />
          <Hr type="spacer" />
          <SidebarListUsers title="Following" items={users} />
          <Hr type="spacer" />
          <SidebarListUsers title="Followers" items={users} />
        </Sidebar>
      </Flex>
    </div>
  );
};

export default Home;
