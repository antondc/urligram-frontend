import React from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmarkRounded.svg';
import Title from 'Assets/svg/sortTitle.svg';
import TagIcon from 'Assets/svg/tag.svg';
import A from 'Components/A';
import CardItem from 'Components/CardItem';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { TagState } from 'Modules/Tags/tags.types';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { SortBy, Space, Tag, TagsSkeleton } from '@antoniodcorrea/components';

import './Tags.less';

interface Props {
  tags: TagState[];
  tagsLoading: boolean;
  currentHref: string;
  sort: string;
  glossary: GlossaryState;
}

export const Tags: React.FC<Props> = ({tags, tagsLoading, currentHref, sort, glossary}) => (
    <>
        <Helmet>
            <title>{`${SITE_TITLE} · ${glossary.tags}`}</title>
            <meta property="og:title" content={`${SITE_TITLE} · ${glossary.tags}`}/>
            <meta property="og:url" content={currentHref}/>
            <meta property="twitter:title" content={`${SITE_TITLE} · ${glossary.tags}`}/>
            <meta property="twitter:url" content={currentHref}/>
        </Helmet>
        <div className="Tags">
            <Helmet title={`${SITE_TITLE} · Tags`}/>
            <CardItem className="Tags-header">
                <div className="Tags-headerTitle">
                    <TagIcon/>
                    All Tags
                </div>
                <div className="Tags-separator"/>
                <SortBy
                    options={[
                        {label: 'Bookmarks', field: 'count', icon: Bookmark},
                        {label: 'Name', field: 'name', icon: Title},
                    ]}
                    href={currentHref}
                    currentSort={sort}
                    loading={tagsLoading}
                />
            </CardItem>
            <div className="Tags-tags">
                {tagsLoading ? (
                    <TagsSkeleton length={tags?.length || 70}/>
                ) : (
                    tags?.map((item) => (
                        <A className="Tags-tag" href={`?filter[tags][]=${item.name}`} key={item.id} styled={false}
                           frontend>
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
    </>
);
