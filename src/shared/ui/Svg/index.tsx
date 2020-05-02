import React from 'react';
import TriangleSvg from '../../assets/svg/triangle.svg';
import SquareSvg from '../../assets/svg/square.svg';
import CircleSvg from '../../assets/svg/circle.svg';
import CheckSvg from '../../assets/svg/check.svg';
import CrossSvg from '../../assets/svg/cross.svg';
import ArrowRightSvg from '../../assets/svg/arrowRight.svg';
import ArrowDownSvg from '../../assets/svg/arrowDown.svg';
import ArrowUpSvg from '../../assets/svg/arrowUp.svg';
import ArrowLeftSvg from '../../assets/svg/arrowLeft.svg';
import LoupeSvg from '../../assets/svg/loupe.svg';
import UploadSvg from '../../assets/svg/upload.svg';
import UserSvg from '../../assets/svg/user.svg';
import * as Icons from '.';
import { SvgClickEvent } from './Svg.types';

import './Svg.less';

export type IconSize = 'nano' | 'micro' | 'small' | 'normal' | 'medium' | 'big' | 'biggest' | 'huge';

export type IconsType =
  | 'Triangle'
  | 'Square'
  | 'Circle'
  | 'Check'
  | 'Cross'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'Loupe'
  | 'Upload'
  | 'User';

export interface Props {
  size?: IconSize;
  className?: string;
  filled?: boolean;
  onClick?: (event: SvgClickEvent) => void;
}

export type SvgSpriteType = (
  SvgComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
) => (props: Props) => JSX.Element;

const Svg: SvgSpriteType = (SvgComponent) => ({ className, size = 'normal', onClick, filled }): React.ReactElement => (
  <SvgComponent
    className={
      'Svg ' +
      (className ? className : '') +
      (size ? ' Svg-' + size : '') +
      (onClick ? ' Svg--hover' : '') +
      (filled ? ' Svg--filled' : '')
    }
    onClick={onClick}
  />
);

export const Triangle: React.FC<Props> = (props) => Svg(TriangleSvg)(props);
export const Square: React.FC<Props> = (props) => Svg(SquareSvg)(props);
export const Circle: React.FC<Props> = (props) => Svg(CircleSvg)(props);
export const Check: React.FC<Props> = (props) => Svg(CheckSvg)(props);
export const Cross: React.FC<Props> = (props) => Svg(CrossSvg)(props);
export const ArrowRight: React.FC<Props> = (props) => Svg(ArrowRightSvg)(props);
export const ArrowUp: React.FC<Props> = (props) => Svg(ArrowUpSvg)(props);
export const ArrowDown: React.FC<Props> = (props) => Svg(ArrowDownSvg)(props);
export const ArrowLeft: React.FC<Props> = (props) => Svg(ArrowLeftSvg)(props);
export const Loupe: React.FC<Props> = (props) => Svg(LoupeSvg)(props);
export const Upload: React.FC<Props> = (props) => Svg(UploadSvg)(props);
export const User: React.FC<Props> = (props) => Svg(UserSvg)(props);

interface IconProps extends Props {
  name: IconsType;
}

const SvgIcon: React.FC<IconProps> = ({ name, size, className }) => {
  const Component = Icons[name];

  return <Component size={size} className={className} />;
};

export default SvgIcon;
