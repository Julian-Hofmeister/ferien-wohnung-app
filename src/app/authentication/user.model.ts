export interface User {
  id?: string;

  email: string;
  password: string;

  role: string;

  clientId?: string;
  houseId: string;
  apartmentId?: string;
  apartmentName?: string;

  arriveDate: number;
  leaveDate: number;

  latestMessage?: string;
  isRead?: boolean;
}
