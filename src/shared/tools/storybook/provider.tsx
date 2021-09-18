import React from 'react';
import { Provider } from 'react-redux';

import storeFactory from 'Redux/.';

const store = storeFactory({});

export const ProviderWrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>;
