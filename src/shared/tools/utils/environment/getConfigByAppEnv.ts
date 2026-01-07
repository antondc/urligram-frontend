import Config from 'Root/config.test.json';

export const getConfigByAppEnv = (variable: string): string => Config[process.env.APP_ENV][variable] || Config[variable];
