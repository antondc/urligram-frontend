import React from 'react';
import { Provider } from 'react-redux';

import storeFactory from 'Redux/.';

const store = storeFactory({});

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const ProviderWrapper: React.FC<Props> = ({ children }) => <Provider store={store}>{children}</Provider>;
