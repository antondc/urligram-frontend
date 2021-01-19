import React from 'react';

import { UserState } from 'Modules/Users/users.types';
import { A, Border, Edit, Private, Span, Tag, User } from '@antoniodcorrea/components';

import './UserRow.less';

interface UserRow extends UserState {
  id: string;
}

export const UserRow: React.FC<UserRow> = ({ id, name, image, tags }) => (
  <Border grow className="UserRow" data-test-id="UserRow" key={id}>
    <div className="UserRow-left">
      <div className="UserRow-icons">
        <User size="micro" className="UserRow-icon" />
        <Private
          size="micro"
          className="UserRow-icon UserRow-iconHover"
          onClick={() => {
            alert('Private');
          }}
        />
        <Edit
          size="micro"
          className="UserRow-icon UserRow-iconHover"
          onClick={() => {
            alert('Edit');
          }}
        />
      </div>
      <div className="UserRow-leftTop">
        <Span bold className="UserRow-title">
          {name}
        </Span>
        <div className="UserRow-url">
          <A href={'example.com'}>
            <Span size="small">{'example.com'}</Span>
          </A>
        </div>
      </div>
      <div className="UserRow-tags">
        {tags?.map((item) => (
          <A href={`/tags/${item.name}`} key={item.id} styled={false} frontend>
            <Tag className="UserRow-tag" size="small">
              {item.name}
            </Tag>
          </A>
        ))}
      </div>
    </div>
    <div className="UserRow-right">
      <img className="UserRow-image" src={image} />
      <div className="UserRow-rightEnd">
        <div className="UserRow-stats">
          <div className="UserRow-stat">
            <Span size="nano" className="UserRow-statIcon">
              ▲
            </Span>
            2
          </div>
          <div className="UserRow-stat">
            <Span size="nano" className="UserRow-statIcon">
              ⚭
            </Span>
            4
          </div>
        </div>
      </div>
    </div>
  </Border>
);

export default UserRow;
