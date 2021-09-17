import React, { HTMLProps } from 'react';
import { useSelector } from 'react-redux';
import { animateScroll as scroll, Events } from 'react-scroll';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import history from 'Services/History';
import { A as ComponentsA } from '@antoniodcorrea/components';

interface Props extends HTMLProps<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  href: string;
  frontend?: boolean;
  styled?: boolean;
  active?: boolean;
  targetBlank?: boolean;
  disabled?: boolean;
  title?: string;
  underlined?: boolean;
  scrollBeforeNavigate?: boolean;
  onClick?: (any) => void;
}

const A: React.FC<Props> = ({ href, targetBlank, scrollBeforeNavigate = true, ...props }) => {
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const hrefWithoutLeadingSlash = href?.replace(/^\//, '');
  const hrefAlreadyHasSlug = hrefWithoutLeadingSlash?.startsWith(currentLanguageSlug);

  const hrefWithCurrentSlug =
    !!currentLanguageSlug && !targetBlank && !hrefAlreadyHasSlug
      ? `/${currentLanguageSlug}/${hrefWithoutLeadingSlash}`
      : href;

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (!scrollBeforeNavigate) return;

    e.preventDefault();

    Events.scrollEvent.register('end', () => {
      if (targetBlank) {
        window.open(url);
      } else {
        history.push(url);
      }
      Events.scrollEvent.remove('end');
    });

    scroll.scrollToTop({
      duration: 120,
      smooth: 'easeOutQuart',
    });
  };

  return (
    <ComponentsA
      {...props}
      href={hrefWithCurrentSlug}
      onClick={(e) => onLinkClick(e, hrefWithCurrentSlug)}
      targetBlank={targetBlank}
    />
  );
};

export default A;
