export interface UserState {
  id: number;
  name: string;
  description: string;
  isPrivate: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  members: number;
  listMembers: [
    {
      id: string;
      name: string;
      userRole: string;
    },
    {
      id: string;
      name: string;
      userRole: string;
    }
  ];
}
