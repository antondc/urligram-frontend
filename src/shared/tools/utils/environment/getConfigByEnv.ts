import Config from 'Root/config.test.json';

export const getConfigByEnv = (variable: string): string => Config[process.env.NODE_ENV][variable] || Config[variable];
