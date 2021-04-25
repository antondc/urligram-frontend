import React from 'react';

import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { Fade } from '.';

export default {
  title: 'Fade',
  component: Fade,
  decorators: [withKnobs],
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};

export const OneElement: React.FC = () => {
  const mounted = boolean('Mounted', true);
  const speed = select('Speed', ['slow', 'normal', 'fast', 'fastest'], 'fast');
  const direction = select('Direction', [undefined, 'up', 'down', 'left', 'right'], 'up');

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Fade speed={speed} mounted={mounted} direction={direction}>
        <div style={{ width: '50px', height: '50px', background: 'black' }} />
      </Fade>
    </div>
  );
};

export const ManyElements: React.FC = () => {
  const mounted = boolean('Mounted', true);
  const speed = select('Speed', ['slow', 'normal', 'fast', 'fastest'], 'fast');
  const direction = select('Direction', [undefined, 'up', 'down', 'left', 'right'], 'up');

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '50px' }}>
      <Fade speed={speed} mounted={mounted} direction={direction} delayOut={300}>
        <div style={{ width: '50px', height: '50px', background: 'black', marginBottom: '5px' }} />
      </Fade>
      <Fade speed={speed} mounted={mounted} direction={direction} delayIn={75} delayOut={225}>
        <div style={{ width: '50px', height: '50px', background: 'black', marginBottom: '5px' }} />
      </Fade>
      <Fade speed={speed} mounted={mounted} direction={direction} delayIn={150} delayOut={150}>
        <div style={{ width: '50px', height: '50px', background: 'black', marginBottom: '5px' }} />
      </Fade>
      <Fade speed={speed} mounted={mounted} direction={direction} delayIn={225} delayOut={75}>
        <div style={{ width: '50px', height: '50px', background: 'black', marginBottom: '5px' }} />
      </Fade>
      <Fade speed={speed} mounted={mounted} direction={direction} delayIn={300}>
        <div style={{ width: '50px', height: '50px', background: 'black', marginBottom: '5px' }} />
      </Fade>
    </div>
  );
};
