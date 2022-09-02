export interface Reservation {
  id?: string;
  time?: number;
  duration?: number;
  isFree?: boolean;
  user?: string;
  isReservedByUser?: boolean;
  isOutdated?: boolean;
  isSelected?: boolean;
}
