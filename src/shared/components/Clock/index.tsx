import React, { useEffect, useState } from 'react';

import { Clock as ClockUi } from './Clock';

import './Clock.less';

const Clock: React.FC = ({}) => {
  const [angleHour, setAngleHour] = useState<number>(0);
  const [angleMinute, setAngleMinute] = useState<number>(0);

  const clock = () => {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const angleMinutes = minutes * 6;
    const angleHour = ((hours % 12) / 12) * 360 + angleMinutes / 12;

    setAngleMinute(angleMinutes);
    setAngleHour(angleHour);
  };

  const refreshClock = () => {
    clock(), setTimeout(refreshClock, 1000);
  };

  useEffect(() => {
    refreshClock();
  }, []);

  return <ClockUi angleHour={angleHour} angleMinute={angleMinute} />;
};

export default Clock;
