declare module 'path-to-regexp';

// Type declaration for SVGs

declare module '*.svg' {
  const value: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}
