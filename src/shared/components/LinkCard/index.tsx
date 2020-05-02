import React from 'react';
import H4 from 'Ui/H4';
import Span from 'Ui/Span';
import Tag from 'Ui/Tag';
import Border from 'Ui/Border';
import Vote from 'Ui/Vote';

import './LinkCard.less';

interface Props {
  id: number;
  title: string;
  url: string;
  tags: {
    id: number;
    name: string;
  }[];
  img: string;
  vote?: boolean;
}

const LinkCard: React.FC<Props> = ({ id, title, url, tags, img, vote }) => {
  const onVote = (vote) => {
    console.log(vote, id);
  };

  return (
    <Border grow className="LinkCard">
      <div className="LinkCard-left">
        <H4>{title}</H4>
        <Span>{url}</Span>
        <div className="LinkCard-tags">
          {tags.map((item) => (
            <Tag className="LinkCard-tag" key={item.id}>
              {item.name}
            </Tag>
          ))}
        </div>
      </div>
      <div className="LinkCard-right">
        <img className="LinkCard-image" src={img} />
        <Vote className="LinkCard-vote" vote={vote} changeVote={onVote} />
      </div>
    </Border>
  );
};

export default LinkCard;
