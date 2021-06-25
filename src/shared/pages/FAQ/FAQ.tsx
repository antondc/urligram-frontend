import React from 'react';

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
  <div className="FAQ">
    <div className="FAQ-left" />
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
);
