import { animateScroll as scroll, Events } from 'react-scroll';

export const useScrollBeforeCallback = (): {
  scrollBeforeCallback: (callback: any) => void;
} => {
  const scrollBeforeCallback = <T extends () => void>(callback: T): void => {
    Events.scrollEvent.register('end', () => {
      callback();

      Events.scrollEvent.remove('end');
    });

    scroll.scrollToTop({
      duration: 120,
      smooth: 'easeOutQuart',
    });
  };

  return { scrollBeforeCallback };
};
