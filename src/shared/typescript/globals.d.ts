declare module 'path-to-regexp';

// Type declaration for SVGs

declare module '*.svg' {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}

declare namespace React {
  function memo<Props extends Record<string, any>>(
    Component: FC<Props>,
    propsAreEqual?: (
      prevProps: Readonly<PropsWithChildren<Props>>,
      nextProps: Readonly<PropsWithChildren<Props>>
    ) => boolean
  ): NamedExoticComponent<PropsWithChildren<Props>>;
}
