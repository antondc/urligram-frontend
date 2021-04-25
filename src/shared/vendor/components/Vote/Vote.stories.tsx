import React, { useState } from 'react';

import { H1 } from '../H1';
import { Hr } from '../Hr';
import { Vote } from '.';

export default {
  component: Vote,
  title: 'Vote',
};

export const Empty: React.ReactNode = () => {
  const [vote, setVote] = useState(undefined);
  const [loading, setLoading] = useState(undefined);
  const onVoteChange = (vote) => {
    setLoading(true);
    setTimeout(() => {
      setVote(vote); // Simulate API delay
      setLoading(false);
    }, 1000);
  };

  const finalVote = !!vote || (vote === false ? false : undefined);

  return (
    <div>
      <H1>Vote</H1>
      <Hr size="nano" />
      <Hr spacer />
      <Vote vote={finalVote} changeVote={onVoteChange} loading={loading} />
    </div>
  );
};
