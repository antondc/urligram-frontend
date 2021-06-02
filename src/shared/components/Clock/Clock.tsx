import React from 'react';

import './Clock.less';

interface Props {
  angleHour: number;
  angleMinute: number;
}

export const Clock: React.FC<Props> = ({ angleHour, angleMinute }) => (
  <div className="Clock">
    <div className="Clock-clock">
      <div id="Clock-hour" className="Clock-hour" style={{ transform: `rotate(${angleHour}deg)` }} />
      <div id="Clock-minute" className="Clock-minute" style={{ transform: `rotate(${angleMinute}deg)` }} />
    </div>
  </div>
);
