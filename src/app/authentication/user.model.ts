export interface User {
  id?: string;
  houseId: string;
  email: string;
  arriveDate: number;
  leaveDate: number;
  apartment: string;
  latestMessage?: string;
  isRead?: boolean;
}
