import React from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmarkRounded.svg';
import Title from 'Assets/svg/sortTitle.svg';
import TagIcon from 'Assets/svg/tag.svg';
import A from 'Components/A';
import CardItem from 'Components/CardItem';
import {TagState} from 'Modules/Tags/tags.types';
import {UserState} from 'Modules/Users/users.types';
import {SITE_TITLE} from 'Root/src/shared/constants';
import {SortBy, Space, Tag, TagsSkeleton} from '@antoniodcorrea/components';

import './UserTags.less';

interface Props {
    user: UserState;
    tags: TagState[];
    tagsLoading: boolean;
    currentHref: string;
    sort: string;
}

export const UserTags: React.FC<Props> = ({user, tags, tagsLoading, currentHref, sort}) => (
    <div className="UserTags">
        <Helmet title={`${SITE_TITLE} · User Tags`}/>
        <CardItem className="UserTags-header">
            <div className="UserTags-headerTitle">
                <TagIcon/>
                {user?.name && (
                    <>
                        <A className="UserTags-headerLink" href={`/users/${user?.id}`} frontend>
                            {`${user?.name}`}
                        </A>
                        ’s
                        <Space/>
                        tags
                    </>
                )}
            </div>
            <div className="UserTags-separator"/>
            <SortBy
                options={[
                    {label: 'Bookmarks', field: 'count', icon: Bookmark},
                    {label: 'Name', field: 'name', icon: Title},
                ]}
                href={ currentHref}
                currentSort={sort}
                loading={tagsLoading}
            />
        </CardItem>
        <div className="UserTags-tags">
            {tagsLoading ? (
                <TagsSkeleton/>
            ) : (
                tags?.map((item) => (
                    <A
                        className="UserTags-tag"
                        href={`/users/${user?.id}/bookmarks?filter[tags][]=${item?.name}`}
                        key={item?.id}
                        styled={false}
                        frontend
                    >
                        <Tag>
                            {item?.name}
                            <Space/>
                            <Space/>
                            <Space/>
                            {item?.count}
                        </Tag>
                    </A>
                ))
            )}
        </div>
    </div>
);
