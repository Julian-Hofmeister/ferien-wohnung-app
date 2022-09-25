import { Info } from './info.model';

export interface InfoCard {
  title: string;
  columns: boolean;
  infos: Info[];
  freeText: string;
}
