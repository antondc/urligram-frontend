import React from 'react';
import Helmet from 'react-helmet';

import { SITE_TITLE } from 'Root/src/shared/constants';

import './FAQ.less';

interface Props {
  data: {
    [key: string]: {
      title: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
  };
  currentSlug: string;
}

export const FAQ: React.FC<Props> = ({ data, currentSlug }) => (
  <>
    <Helmet title={`${SITE_TITLE} · FAQ`} />
    <div className="FAQ">
      <div className="FAQ-content">
        <h1 className="FAQ-title">{data[currentSlug]?.title}</h1>
        {data[currentSlug]?.questions.map((item, index) => (
          <details className="FAQ-item" key={index}>
            <summary className="FAQ-question">{item.question}</summary>
            <div className="FAQ-answer">{item.answer}</div>
          </details>
        ))}
      </div>
    </div>
  </>
);
