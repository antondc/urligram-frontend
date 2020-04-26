import { Languages } from './modules/Languages/languages.reducer';
import { Routes } from './modules/Routes/routes.reducer';
import { User } from './modules/User/user.reducer';
import { MockDataOne } from './modules/MockDataOne/mockDataOne.reducer';
import { MockDataTwo } from './modules/MockDataTwo/mockDataTwo.reducer';
import { Ui } from './modules/Ui/ui.reducer';

export const RootReducers = {
  Languages,
  Routes,
  User,
  MockDataOne,
  MockDataTwo,
  Ui,
};
