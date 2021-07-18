import React, { SVGProps } from 'react';

import ArrowDownSvg from '../../../assets/svg/arrowDown.svg';
import ArrowLeftSvg from '../../../assets/svg/arrowLeft.svg';
import ArrowRightSvg from '../../../assets/svg/arrowRight.svg';
import ArrowUpSvg from '../../../assets/svg/arrowUp.svg';
import BookmarkSvg from '../../../assets/svg/bookmark.svg';
import BookmarkFilledSvg from '../../../assets/svg/bookmarkFilled.svg';
import BookmarkWithBackgroundSvg from '../../../assets/svg/bookmarkWithBackground.svg';
import CheckSvg from '../../../assets/svg/check.svg';
import CircleSvg from '../../../assets/svg/circle.svg';
import CrossSvg from '../../../assets/svg/cross.svg';
import DotsVerticalSvg from '../../../assets/svg/dotsVertical.svg';
import EditSvg from '../../../assets/svg/edit.svg';
import EditCircleSvg from '../../../assets/svg/editCircle.svg';
import EyeSvg from '../../../assets/svg/eye.svg';
import FolderSvg from '../../../assets/svg/folder.svg';
import LinkSvg from '../../../assets/svg/link.svg';
import ListSvg from '../../../assets/svg/list.svg';
import LoupeSvg from '../../../assets/svg/loupe.svg';
import PlusCircleSvg from '../../../assets/svg/plusCircle.svg';
import PlusCircleWithBackgroundSvg from '../../../assets/svg/plusCircleWithBackground.svg';
import PrivateSvg from '../../../assets/svg/private.svg';
import SendSvg from '../../../assets/svg/send.svg';
import SortSvg from '../../../assets/svg/sort.svg';
import SquareSvg from '../../../assets/svg/square.svg';
import TriangleSvg from '../../../assets/svg/triangle.svg';
import UploadSvg from '../../../assets/svg/upload.svg';
import UserSvg from '../../../assets/svg/user.svg';
import UserAddSvg from '../../../assets/svg/userAdd.svg';
import UserAdminSvg from '../../../assets/svg/userAdmin.svg';
import UserRemoveSvg from '../../../assets/svg/userRemove.svg';
import * as Icons from '.';

import './Svg.less';

export type IconSize = 'pico' | 'nano' | 'micro' | 'small' | 'normal' | 'medium' | 'big' | 'biggest' | 'huge';

export type IconsType =
  | 'Sort'
  | 'Triangle'
  | 'Square'
  | 'Circle'
  | 'Check'
  | 'Cross'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'DotsVertical'
  | 'Folder'
  | 'Loupe'
  | 'Upload'
  | 'User'
  | 'UserAdmin'
  | 'UserAdd'
  | 'UserRemove'
  | 'Link'
  | 'Bookmark'
  | 'BookmarkFilled'
  | 'BookmarkWithBackground'
  | 'Private'
  | 'Edit'
  | 'Send'
  | 'PlusCircle'
  | 'EditCircle'
  | 'PlusCircleWithBackground'
  | 'List'
  | 'Eye';

export interface Props extends SVGProps<SVGElement> {
  size?: IconSize;
  className?: string;
  filled?: boolean;
}

export type SvgSpriteType = (SvgComponent: React.FC<Props>) => (props: Props) => JSX.Element;

const Svg: SvgSpriteType =
  (SvgComponent) =>
  ({ className, size = 'normal', onClick, filled, ...props }): React.ReactElement =>
    (
      <SvgComponent
        className={
          'Svg ' +
          (className ? className : '') +
          (size ? ' Svg-' + size : '') +
          (onClick ? ' Svg--hover' : '') +
          (filled ? ' Svg--filled' : '')
        }
        onClick={onClick}
        {...props}
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
export const DotsVertical: React.FC<Props> = (props) => Svg(DotsVerticalSvg)(props);
export const Folder: React.FC<Props> = (props) => Svg(FolderSvg)(props);
export const Loupe: React.FC<Props> = (props) => Svg(LoupeSvg)(props);
export const Upload: React.FC<Props> = (props) => Svg(UploadSvg)(props);
export const User: React.FC<Props> = (props) => Svg(UserSvg)(props);
export const UserAdmin: React.FC<Props> = (props) => Svg(UserAdminSvg)(props);
export const UserAdd: React.FC<Props> = (props) => Svg(UserAddSvg)(props);
export const UserRemove: React.FC<Props> = (props) => Svg(UserRemoveSvg)(props);
export const Private: React.FC<Props> = (props) => Svg(PrivateSvg)(props);
export const Link: React.FC<Props> = (props) => Svg(LinkSvg)(props);
export const Bookmark: React.FC<Props> = (props) => Svg(BookmarkSvg)(props);
export const BookmarkFilled: React.FC<Props> = (props) => Svg(BookmarkFilledSvg)(props);
export const BookmarkWithBackground: React.FC<Props> = (props) => Svg(BookmarkWithBackgroundSvg)(props);
export const Edit: React.FC<Props> = (props) => Svg(EditSvg)(props);
export const PlusCircle: React.FC<Props> = (props) => Svg(PlusCircleSvg)(props);
export const EditCircle: React.FC<Props> = (props) => Svg(EditCircleSvg)(props);
export const PlusCircleWithBackground: React.FC<Props> = (props) => Svg(PlusCircleWithBackgroundSvg)(props);
export const Send: React.FC<Props> = (props) => Svg(SendSvg)(props);
export const Sort: React.FC<Props> = (props) => Svg(SortSvg)(props);
export const List: React.FC<Props> = (props) => Svg(ListSvg)(props);
export const Eye: React.FC<Props> = (props) => Svg(EyeSvg)(props);

interface IconProps extends Props {
  name: IconsType;
}

export const SvgIcon: React.FC<IconProps> = ({ name, size, className, ...props }) => {
  const Component = Icons[name];

  return <Component size={size} className={className} {...props} />;
};
