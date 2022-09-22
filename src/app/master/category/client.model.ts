export interface Client {
  id: string;

  firstName: string;
  lastName: string;

  password: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string;

  houses: string[];
}
