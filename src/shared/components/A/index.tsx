import React, { HTMLProps } from 'react';
import { useSelector } from 'react-redux';

import { useScrollBeforeCallback } from 'Hooks/useScrollBeforeCallback';
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
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const A: React.FC<Props> = ({ href, targetBlank, scrollBeforeNavigate = false, onClick, ...props }) => {
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const hrefWithoutLeadingSlash = href?.replace(/^\//, '');
  const hrefAlreadyHasSlug = hrefWithoutLeadingSlash?.startsWith(currentLanguageSlug);
  const hrefWithCurrentSlug =
    !!currentLanguageSlug && !targetBlank && !hrefAlreadyHasSlug
      ? `/${currentLanguageSlug}/${hrefWithoutLeadingSlash}`
      : href;
  const { scrollBeforeCallback } = useScrollBeforeCallback();

  const navigateToHref = () => {
    if (targetBlank) {
      window.open(hrefWithCurrentSlug);

      return;
    }

    history.push(hrefWithCurrentSlug);
  };

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick && onClick(e);

    if (!scrollBeforeNavigate) {
      navigateToHref();

      return;
    }

    scrollBeforeCallback(() => navigateToHref());
  };

  return <ComponentsA {...props} href={hrefWithCurrentSlug} onClick={onLinkClick} targetBlank={targetBlank} />;
};

export default A;
