import { Languages } from './modules/Languages/languages.reducer';
import { User } from './modules/User/user.reducer';
import { MockDataOne } from './modules/MockDataOne/mockDataOne.reducer';
import { MockDataTwo } from './modules/MockDataTwo/mockDataTwo.reducer';

export const RootReducers = {
  User,
  MockDataOne,
  MockDataTwo,
  Languages,
};
