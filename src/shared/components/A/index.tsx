import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { A as ComponentsA } from '@antoniodcorrea/components';

interface Props {
  children: React.ReactNode;
  className?: string;
  href: string;
  frontend?: boolean;
  styled?: boolean;
  targetBlank?: boolean;
  disabled?: boolean;
  title?: string;
  underlined?: boolean;
  onClick?: (any) => void;
}

const A: React.FC<Props> = ({ href, ...props }) => {
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const hrefWithoutLeadingSlash = href.replace(/^\//, '');

  const hrefWithCurrentSlug = currentLanguageSlug ? `/${currentLanguageSlug}/${hrefWithoutLeadingSlash}` : href;

  return <ComponentsA {...props} href={hrefWithCurrentSlug} />;
};

export default A;
