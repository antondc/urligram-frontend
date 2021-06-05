import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { A as ComponentsA } from 'Vendor/components';

interface Props {
  children: React.ReactNode;
  className?: string;
  href: string;
  frontend?: boolean;
  styled?: boolean;
  active?: boolean;
  targetBlank?: boolean;
  disabled?: boolean;
  title?: string;
  underlined?: boolean;
  onClick?: (any) => void;
}

const A: React.FC<Props> = ({ href, targetBlank, ...props }) => {
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const hrefWithoutLeadingSlash = href?.replace(/^\//, '');

  const hrefWithCurrentSlug =
    !!currentLanguageSlug && !targetBlank ? `/${currentLanguageSlug}/${hrefWithoutLeadingSlash}` : href;

  return <ComponentsA {...props} href={hrefWithCurrentSlug} targetBlank={targetBlank} />;
};

export default A;
