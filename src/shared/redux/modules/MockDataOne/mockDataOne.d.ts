export interface IMockDataOne {
  status: 'ok' | 'error';
  data: {
    MockDataOne: {
      isFetching?: boolean;
      id: number;
      order: number;
      createdAt: string;
      updatedAt: string;
    };
  };
}
