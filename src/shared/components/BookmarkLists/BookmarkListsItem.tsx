// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { selectListsByUserId } from 'Modules/Lists/selectors/selectListsByUserId';
// import { RootState } from 'Modules/rootType';
// import { selectSession } from 'Modules/Session/selectors/selectSession';
// import { DELAY_THREE_SEC } from 'Root/src/shared/constants';
// import { ListState } from '../../redux/modules/Lists/lists.types';

// interface Props {
//   list: ListState;
//   bookmarkId: number;
// }

// export const BookmarkListsItem: React.FC<Props> = ({ list, bookmarkId }) => {
//   const [loading, setLoading] = useState<boolean>(false);

//   const onListEnter = () => {
//     setInList(true);
//   };

//   const onListLeave = () => {
//     setMounted(false);
//     setInList(false);
//   };

//   const onListsClick = () => {
//     setMounted(!mounted);
//   };

//   const onListClick = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//   };

//   return <div>askda</div>;
// };

// export default BookmarkListsItem;
