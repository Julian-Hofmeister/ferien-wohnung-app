export interface User {
  id?: string;

  email: string;
  password: string;

  role: string;

  houseId: string;
  apartment: string;

  arriveDate: number;
  leaveDate: number;

  latestMessage?: string;
  isRead?: boolean;
}
